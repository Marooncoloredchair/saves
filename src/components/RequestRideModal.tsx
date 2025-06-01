'use client'

import { useState, useEffect } from 'react'

interface RequestRideModalProps {
  open: boolean
  onClose: () => void
  onRequest: (request: { eventId: string; pickupLocation: string }) => void
  events: { id: string | number; title: string }[]
  selectedEventId?: string | number | null
}

export default function RequestRideModal({ open, onClose, onRequest, events, selectedEventId }: RequestRideModalProps) {
  const [eventId, setEventId] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && selectedEventId) {
      setEventId(String(selectedEventId))
    }
    if (!open) {
      setEventId('')
      setPickupLocation('')
      setError(null)
    }
  }, [open, selectedEventId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      onRequest({ eventId, pickupLocation })
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Request a Ride</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-1">
              Event
            </label>
            <select
              id="event"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select an event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="input-field"
              placeholder="Enter your pickup location"
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-sm text-red-600">
              {error}
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Requesting...' : 'Request Ride'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 