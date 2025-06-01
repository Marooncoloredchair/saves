'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import EventCard from '@/components/EventCard'
import RequestRideModal from '@/components/RequestRideModal'
import Navigation from '@/components/Navigation'
import CreateEventModal from '@/components/CreateEventModal'

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

export default function EventsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isRequestRideModalOpen, setIsRequestRideModalOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Events page mounted')
    console.log('Current user:', user?.email, 'Role:', user?.role)
    
    if (!user) {
      console.log('No user found, redirecting to sign in')
      router.push('/auth/signin')
      return
    }
    fetchEvents()
  }, [user, router])

  const fetchEvents = async () => {
    console.log('Fetching events...')
    try {
      setLoading(true)
      const response = await fetch('/api/events')
      const data = await response.json()
      console.log('Fetched events:', data)
      
      if (Array.isArray(data)) {
        // Transform the data to include RSVPs for the current user
        const eventsWithRsvps = await Promise.all(data.map(async (event) => {
          if (!user) return event
          try {
            console.log('Getting ID token for user:', user.email)
            const idToken = await user.getIdToken()
            console.log('Got ID token, fetching RSVP for event:', event.id)
            
            const rsvpResponse = await fetch(`/api/events/${event.id}/rsvp`, {
              headers: {
                'Authorization': `Bearer ${idToken}`
              }
            })
            if (rsvpResponse.ok) {
              const rsvpData = await rsvpResponse.json()
              console.log('RSVP data for event:', event.id, rsvpData)
              return { ...event, rsvps: [rsvpData] }
            }
          } catch (error) {
            console.error('Error fetching RSVP for event:', event.id, error)
          }
          return event
        }))
        console.log('Setting events with RSVPs:', eventsWithRsvps)
        setEvents(eventsWithRsvps)
      } else {
        console.error('Failed to fetch events:', data.error)
        setError(data.error || 'Failed to fetch events')
      }
    } catch (error) {
      console.error('Error in fetchEvents:', error)
      setError('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (eventData: { title: string; date: string; time: string; description: string }) => {
    if (!user) {
      console.log('No user found, cannot create event')
      return
    }
    console.log('Creating event:', eventData)
    try {
      const idToken = await user.getIdToken()
      console.log('Got ID token for event creation')
      
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        throw new Error('Failed to create event')
      }

      console.log('Event created successfully')
      await fetchEvents()
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('Error creating event:', error)
      setError('Failed to create event')
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!user) {
      console.log('No user found, cannot delete event')
      return
    }
    console.log('Deleting event:', eventId)
    try {
      const idToken = await user.getIdToken()
      console.log('Got ID token for event deletion')
      
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Failed to delete event:', errorData)
        throw new Error('Failed to delete event')
      }

      console.log('Event deleted successfully')
      await fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      setError('Failed to delete event')
    }
  }

  const handleRSVP = async (eventId: string, status: 'ATTENDING' | 'NOT_ATTENDING') => {
    if (!user) {
      console.log('No user found, cannot RSVP')
      return
    }
    console.log('RSVPing to event:', eventId, 'Status:', status)
    try {
      const idToken = await user.getIdToken()
      console.log('Got ID token for RSVP')
      
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to RSVP')
      }

      console.log('RSVP successful')
      await fetchEvents()
    } catch (error) {
      console.error('Error RSVPing:', error)
      setError('Failed to RSVP')
    }
  }

  const handleRequestRide = async (request: { eventId: string; pickupLocation: string }) => {
    if (!user) {
      console.log('No user found, cannot request ride')
      return
    }
    console.log('Requesting ride:', request)
    try {
      const idToken = await user.getIdToken()
      console.log('Got ID token for ride request')
      
      const response = await fetch('/api/ride-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error('Failed to request ride')
      }

      console.log('Ride request successful')
      setIsRequestRideModalOpen(false)
    } catch (error) {
      console.error('Error requesting ride:', error)
      setError('Failed to request ride')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading events...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary"
            >
              Create Event
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRequestRide={() => {
                setSelectedEventId(event.id)
                setIsRequestRideModalOpen(true)
              }}
              onDelete={user?.role === 'ADMIN' ? () => handleDeleteEvent(event.id) : undefined}
              onRSVP={user ? (status) => handleRSVP(event.id, status) : undefined}
            />
          ))}
        </div>

        <CreateEventModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateEvent}
        />

        <RequestRideModal
          open={isRequestRideModalOpen}
          onClose={() => setIsRequestRideModalOpen(false)}
          onRequest={handleRequestRide}
          events={events}
          selectedEventId={selectedEventId}
        />
      </main>
    </div>
  )
} 