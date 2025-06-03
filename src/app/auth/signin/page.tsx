"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth"

export default function FirebaseAuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    console.log("Attempting to sign in/sign up", { email, password, isSignUp, name })
    try {
      if (isSignUp) {
        if (!name) {
          setError("Name is required for sign up.")
          setLoading(false)
          return
        }
        const userCred = await createUserWithEmailAndPassword(auth, email, password)
        // Send name to backend to update user record
        await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, uid: userCred.user.uid })
        })
        setMessage("Account created! You are now signed in.")
        console.log("Sign up success", userCred.user)
        window.location.href = "/"
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        setMessage("Signed in successfully!")
        console.log("Sign in success", userCred.user)
        window.location.href = "/"
      }
    } catch (err: any) {
      setError(err.message)
      console.error("Sign in/up error", err)
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword() {
    setError(null)
    setMessage(null)
    if (!email) {
      setError("Enter your email above first.")
      return
    }
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("Password reset email sent!")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    await signOut(auth)
    setMessage("Signed out.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-2 py-1"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-2 py-1"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? (isSignUp ? "Signing up..." : "Signing in...") : isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <button type="button" onClick={handleForgotPassword} className="text-blue-600 hover:underline text-sm" disabled={loading}>
          Forgot Password?
        </button>
        <button type="button" onClick={() => setIsSignUp(s => !s)} className="text-blue-600 hover:underline text-sm">
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
        <button type="button" onClick={handleSignOut} className="text-gray-600 hover:underline text-sm">
          Sign Out
        </button>
        {message && <div className="text-green-700 text-center">{message}</div>}
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </div>
  )
} 