'use client'
import { useState, useEffect } from 'react'
import CarpoolCard from '@/components/CarpoolCard'
import Navigation from '@/components/Navigation'

interface Carpool {
  id: string
  driverName: string
  maxPassengers: number
  passengers: { name: string }[] | string[]
}

export default function CarpoolPage() {
  const [carpools, setCarpools] = useState<Carpool[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/carpools')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCarpools(data)
        } else {
          setError(data.error || 'Unknown error')
          setCarpools([])
        }
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carpools</h1>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carpools.map(carpool => (
            <CarpoolCard key={carpool.id} carpool={{
              ...carpool,
              passengers: Array.isArray(carpool.passengers)
                ? (typeof carpool.passengers[0] === 'object'
                    ? (carpool.passengers as { name: string }[]).map(p => p.name)
                    : (carpool.passengers as string[]))
                : [],
            }} />
          ))}
        </div>
      </main>
    </div>
  )
} 