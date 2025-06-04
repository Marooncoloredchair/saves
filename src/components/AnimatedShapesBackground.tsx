"use client"
import React, { useEffect, useState } from 'react'

const lightShapes = [
  {
    type: 'sphere',
    style: {
      top: '10%', left: '8%', width: 120, height: 120, background: 'radial-gradient(circle at 30% 30%, #229eff 80%, #e3f1ff 100%)',
      filter: 'blur(0.5px)', opacity: 0.18, animation: 'spin 18s linear infinite, fadeInOut 12s ease-in-out infinite',
    },
  },
  {
    type: 'cube',
    style: {
      top: '60%', left: '12%', width: 80, height: 80, background: 'linear-gradient(135deg, #229eff 60%, #e3f1ff 100%)',
      borderRadius: 16, opacity: 0.13, animation: 'spinReverse 22s linear infinite, fadeInOut 14s ease-in-out infinite',
    },
  },
  {
    type: 'blob',
    style: {
      top: '30%', left: '70%', width: 160, height: 110, background: 'radial-gradient(circle at 60% 40%, #229eff 70%, #e3f1ff 100%)',
      borderRadius: '50% 60% 70% 50% / 60% 50% 60% 70%', opacity: 0.14, animation: 'spin 30s linear infinite, fadeInOut 18s ease-in-out infinite',
    },
  },
  {
    type: 'sphere',
    style: {
      top: '75%', left: '80%', width: 100, height: 100, background: 'radial-gradient(circle at 60% 60%, #229eff 80%, #e3f1ff 100%)',
      filter: 'blur(1px)', opacity: 0.12, animation: 'spinReverse 26s linear infinite, fadeInOut 16s ease-in-out infinite',
    },
  },
  {
    type: 'cube',
    style: {
      top: '50%', left: '50%', width: 60, height: 60, background: 'linear-gradient(135deg, #229eff 60%, #e3f1ff 100%)',
      borderRadius: 18, opacity: 0.10, animation: 'spin 20s linear infinite, fadeInOut 20s ease-in-out infinite',
    },
  },
]

const darkShapes = [
  {
    type: 'sphere',
    style: {
      top: '10%', left: '8%', width: 120, height: 120, background: 'radial-gradient(circle at 30% 30%, #1a7fd1 80%, #101624 100%)',
      filter: 'blur(1px)', opacity: 0.13, animation: 'spin 18s linear infinite, fadeInOut 12s ease-in-out infinite',
    },
  },
  {
    type: 'cube',
    style: {
      top: '60%', left: '12%', width: 80, height: 80, background: 'linear-gradient(135deg, #229eff 60%, #223355 100%)',
      borderRadius: 16, opacity: 0.10, animation: 'spinReverse 22s linear infinite, fadeInOut 14s ease-in-out infinite',
    },
  },
  {
    type: 'blob',
    style: {
      top: '30%', left: '70%', width: 160, height: 110, background: 'radial-gradient(circle at 60% 40%, #229eff 60%, #101624 100%)',
      borderRadius: '50% 60% 70% 50% / 60% 50% 60% 70%', opacity: 0.10, animation: 'spin 30s linear infinite, fadeInOut 18s ease-in-out infinite',
    },
  },
  {
    type: 'sphere',
    style: {
      top: '75%', left: '80%', width: 100, height: 100, background: 'radial-gradient(circle at 60% 60%, #229eff 60%, #101624 100%)',
      filter: 'blur(1.5px)', opacity: 0.09, animation: 'spinReverse 26s linear infinite, fadeInOut 16s ease-in-out infinite',
    },
  },
  {
    type: 'cube',
    style: {
      top: '50%', left: '50%', width: 60, height: 60, background: 'linear-gradient(135deg, #229eff 60%, #223355 100%)',
      borderRadius: 18, opacity: 0.08, animation: 'spin 20s linear infinite, fadeInOut 20s ease-in-out infinite',
    },
  },
]

export default function AnimatedShapesBackground() {
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    const check = () => setDarkMode(document.documentElement.classList.contains('dark'))
    check()
    window.addEventListener('storage', check)
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      window.removeEventListener('storage', check)
      observer.disconnect()
    }
  }, [])
  const shapes = darkMode ? darkShapes : lightShapes
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: 'hidden' }}
    >
      {shapes.map((shape, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...shape.style,
            zIndex: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1.05); }
        }
        @keyframes spinReverse {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(-360deg) scale(1.08); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.10; }
          10%, 90% { opacity: 0.18; }
          50% { opacity: 0.22; }
        }
      `}</style>
    </div>
  )
} 