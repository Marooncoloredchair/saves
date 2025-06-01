'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import AnnouncementCard from '@/components/AnnouncementCard'
import Navigation from '@/components/Navigation'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

export default function AnnouncementsPage() {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements')
      const data = await response.json()
      if (Array.isArray(data)) {
        setAnnouncements(data)
      } else {
        setError(data.error || 'Failed to fetch announcements')
      }
    } catch (error) {
      setError('Failed to fetch announcements')
    }
  }

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete announcement')
      }

      await fetchAnnouncements()
    } catch (error) {
      setError('Failed to delete announcement')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Announcements</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onDelete={user?.role === 'ADMIN' ? () => handleDeleteAnnouncement(announcement.id) : undefined}
            />
          ))}
        </div>
      </main>
    </div>
  )
} 