'use client'
import { useState, useEffect } from 'react'
import VolunteerCard from '@/components/VolunteerCard'
import Navigation from '@/components/Navigation'

interface Volunteer {
  id: number | string
  name: string
  role: string
  description: string
}

export default function VolunteerPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/volunteers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVolunteers(data)
        } else {
          setError(data.error || 'Unknown error')
          setVolunteers([])
        }
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteers</h1>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.map(volunteer => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      </main>
    </div>
  )
} 