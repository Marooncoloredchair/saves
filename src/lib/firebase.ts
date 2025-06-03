// saves-dashboard/src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBeOWaEeSQ-j7_r3t9BbfDqfGOsPJWzCMw",
  authDomain: "saves-a5ff5.firebaseapp.com",
  projectId: "saves-a5ff5",
  storageBucket: "saves-a5ff5.appspot.com",
  messagingSenderId: "392716875146",
  appId: "1:392716875146:web:09c8d79f7dfeece6274473",
  measurementId: "G-J7GJEVJN2K"
}

// Prevent re-initialization in Next.js
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const auth = getAuth(app)

// Set persistence to local so users stay logged in
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence set successfully
  })
  .catch((error) => {
    console.error('Error setting Firebase Auth persistence:', error)
  })