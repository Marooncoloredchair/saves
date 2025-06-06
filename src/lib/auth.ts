'use client'

import { useState, useEffect } from 'react'
import { auth } from './firebase'
import type { User } from 'firebase/auth'

interface AuthUser extends User {
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Setting up auth state listener...')
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email)
      
      if (firebaseUser) {
        try {
          console.log('Getting ID token for user:', firebaseUser.email)
          const idToken = await firebaseUser.getIdToken()
          console.log('Got ID token, verifying role...')
          
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          })
          
          if (response.ok) {
            const userData = await response.json()
            console.log('User role verified:', userData.role)
            const authUser = firebaseUser as AuthUser
            authUser.role = userData.role
            setUser(authUser)
          } else {
            console.warn('Role verification failed, setting user without role')
            setUser(firebaseUser as AuthUser)
          }
        } catch (error) {
          console.error('Error in auth flow:', error)
          setUser(firebaseUser as AuthUser)
        }
      } else {
        console.log('No user found, setting user to null')
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      console.log('Cleaning up auth state listener')
      unsubscribe()
    }
  }, [])

  return { user, loading }
} 