'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Navigation() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20 w-full h-16 flex items-center">
      <div className="flex justify-between items-center w-full h-full">
        <div className="flex items-center space-x-8 pl-4">
          <Link href="/">
            <motion.img
              src="/image.png"
              alt="SAVES Logo"
              className="h-10 w-10 object-contain"
              whileHover={{ scale: 1.15, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </Link>
        </div>
        <div className="pr-8">
          {user ? (
            <button onClick={() => firebaseSignOut(auth)} className="text-gray-600 hover:text-blue-600">Sign out</button>
          ) : (
            <Link href="/auth/signin" className="text-gray-600 hover:text-blue-600">Sign in</Link>
          )}
        </div>
      </div>
    </nav>
  )
} 