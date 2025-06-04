"use client"
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])
  const toggle = () => {
    setDark(d => {
      const next = !d
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return next
    })
  }
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{ position: 'fixed', top: 56, right: 24, zIndex: 100, background: 'none', border: 'none', fontSize: 26, cursor: 'pointer' }}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
} 