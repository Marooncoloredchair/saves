'use client'

import { useState } from 'react'
import { Event } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { mutate } from 'swr'

interface EventCardProps {
  event: Event
  onDelete?: () => void
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!user) {
      alert('Please sign in to delete events')
      return
    }

    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return
    }

    try {
      setIsDeleting(true)
      const idToken = await user.getIdToken()
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete event')
      }

      // Update the UI immediately by mutating the SWR cache
      await mutate('/api/events')
      onDelete?.()
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const isOrganizer = user?.uid === event.organizerId
  const isAdmin = user?.email === 'admin@saves.org'
  const canDelete = isOrganizer || isAdmin

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="text-sm text-gray-500">
        {format(new Date(event.date), 'MMMM d, yyyy')} • {event.time}
      </div>
    </div>
  )
} 