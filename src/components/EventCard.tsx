'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  organizerId: string
  createdAt: string
  updatedAt: string
  rsvps?: { status: 'ATTENDING' | 'NOT_ATTENDING' }[]
}

interface EventCardProps {
  event: Event
  onDelete?: () => void
  onRSVP?: (status: 'ATTENDING' | 'NOT_ATTENDING') => void
}

export default function EventCard({ event, onDelete, onRSVP }: EventCardProps) {
  const { user } = useAuth()
  const [rsvpStatus, setRsvpStatus] = useState<'ATTENDING' | 'NOT_ATTENDING' | ''>('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRsvping, setIsRsvping] = useState(false)

  useEffect(() => {
    console.log('EventCard mounted for event:', event.id)
    console.log('Current user:', user?.email, 'Role:', user?.role)
    // Set initial RSVP status from event data
    if (event.rsvps && event.rsvps.length > 0) {
      console.log('Setting initial RSVP status:', event.rsvps[0].status)
      setRsvpStatus(event.rsvps[0].status)
    }
  }, [event.rsvps, user])

  const handleDelete = async () => {
    console.log('Delete button clicked for event:', event.id)
    if (!onDelete) {
      console.log('No delete handler provided')
      return
    }
    setIsDeleting(true)
    try {
      console.log('Calling delete handler for event:', event.id)
      await onDelete()
      console.log('Delete handler completed for event:', event.id)
    } catch (error) {
      console.error('Error in delete handler:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleRSVP = async (status: 'ATTENDING' | 'NOT_ATTENDING') => {
    console.log('RSVP clicked for event:', event.id, 'Status:', status)
    if (!onRSVP) {
      console.log('No RSVP handler provided')
      return
    }
    if (isRsvping) {
      console.log('RSVP already in progress')
      return
    }
    setIsRsvping(true)
    try {
      console.log('Calling RSVP handler...')
      await onRSVP(status)
      console.log('RSVP handler completed')
      setRsvpStatus(status)
    } catch (error) {
      console.error('Error in RSVP handler:', error)
    } finally {
      setIsRsvping(false)
    }
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
        {user?.role === 'ADMIN' && onDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex flex-col space-y-3">
        <div className="text-sm text-gray-500">
          {formattedDate} • {formattedTime}
        </div>
        {onRSVP && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleRSVP('ATTENDING')}
              disabled={isRsvping || rsvpStatus === 'ATTENDING'}
              className={`px-3 py-1 rounded text-sm font-medium ${
                rsvpStatus === 'ATTENDING'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } disabled:opacity-50`}
            >
              {isRsvping ? 'Updating...' : rsvpStatus === 'ATTENDING' ? 'Attending ✓' : 'Attend'}
            </button>
            <button
              onClick={() => handleRSVP('NOT_ATTENDING')}
              disabled={isRsvping || rsvpStatus === 'NOT_ATTENDING'}
              className={`px-3 py-1 rounded text-sm font-medium ${
                rsvpStatus === 'NOT_ATTENDING'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } disabled:opacity-50`}
            >
              {isRsvping ? 'Updating...' : rsvpStatus === 'NOT_ATTENDING' ? 'Not Attending ✓' : 'Not Attending'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 