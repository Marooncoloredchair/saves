'use client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import React from 'react'
import { FaRegCalendarAlt, FaCarSide, FaUser } from 'react-icons/fa'
import Masonry from 'react-masonry-css'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/lib/auth'
import EventCard from '@/components/EventCard'

const WATERMARK = 'Rhody S.A.V.E.S, students, Actively, Volunteering, Engaging , In Service.'

// Simple seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getWatermarkLines(numLines: number) {
  // Use fixed seed for consistent generation
  const seed = 12345 // Fixed seed for consistency
  return Array.from({ length: numLines }).map((_, i) => {
    const offset = Math.floor(seededRandom(seed + i) * 100) - 50
    const rotate = (seededRandom(seed + i + 100) - 0.5) * 20
    const substrStart = Math.floor(seededRandom(seed + i + 200) * WATERMARK.length)
    const text = WATERMARK.slice(substrStart) + WATERMARK.slice(0, substrStart)
    const fontSize = seededRandom(seed + i + 300) > 0.5 ? '1.8rem' : '2rem'
    const opacity = 0.15 + seededRandom(seed + i + 400) * 0.1
    return (
      <div
        key={i}
        className="w-full text-center font-extrabold pointer-events-none select-none"
        style={{
          color: '#0f1a3c',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
          lineHeight: 1.1,
          marginTop: i === 0 ? 0 : `${seededRandom(seed + i + 500) * 2 + 0.5}rem`,
          marginLeft: `${offset}vw`,
          transform: `rotate(${rotate}deg)`,
          fontSize,
          opacity,
          position: 'relative',
          zIndex: 0,
        }}
      >
        {text}
      </div>
    )
  })
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  organizerId: string
  createdAt: string
  updatedAt: string
}

interface RSVP {
  id: string
  status: 'ATTENDING' | 'NOT_ATTENDING'
  userId: string
  eventId: string
}

interface Carpool {
  id: string
  maxPassengers: number
  eventId: string
  driver: {
    id: string
    name: string
  }
  passengers: {
    id: string
    name: string
  }[]
}

interface Member {
  id: string
  name: string
  role: 'ADMIN' | 'MEMBER'
  rideStatus?: 'OFFERING' | 'NEEDS' | null
}

interface Poll {
  id: string
  question: string
  options: string[]
  isActive: boolean
  votes: {
    id: string
    userId: string
    optionIdx: number
  }[]
  createdById: string
  expiresAt?: string // ISO string for expiration
  multipleChoice?: boolean // true if poll allows multiple options
}

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

interface Weather {
  temperature: number
  condition: string
  icon: string
}

interface QuickLink {
  id: string
  label: string
  url: string
}

// Helper to get ID token and make authenticated requests
async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  if (!auth.currentUser) throw new Error('Not signed in');
  const idToken = await auth.currentUser.getIdToken();
  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export default function DashboardPage() {
  const logoRef = useRef<HTMLDivElement>(null)
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [rsvps, setRsvps] = useState<Record<string, RSVP>>({})
  const [carpools, setCarpools] = useState<Carpool[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [polls, setPolls] = useState<Poll[]>([])
  const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''], expiresAt: '', multipleChoice: false })
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number[]>>({}) // pollId -> selected option indices
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' })
  const [weather, setWeather] = useState<Weather | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactLoading, setContactLoading] = useState(false)
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([])
  const [newQuickLink, setNewQuickLink] = useState({ label: '', url: '' })
  const [editingQuickLink, setEditingQuickLink] = useState<QuickLink | null>(null)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '' })
  const [eventLoading, setEventLoading] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'MEMBER', password: '' })
  const [memberLoading, setMemberLoading] = useState(false)
  
  // Memoize watermark lines
  const watermarkLines = useMemo(() => getWatermarkLines(60), [])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin')
    } else if (user) {
      // Check if the user is an admin based on email
      setIsAdmin(user.email === 'admin@saves.org')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsRes, rsvpsRes, carpoolsRes, membersRes, pollsRes, announcementsRes, quickLinksRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/rsvps'),
          fetch('/api/carpools'),
          fetch('/api/members'),
          fetch('/api/polls'),
          fetch('/api/announcements'),
          fetch('/api/quick-links')
        ])
        
        if (!eventsRes.ok || !rsvpsRes.ok || !carpoolsRes.ok || !membersRes.ok || !pollsRes.ok || !announcementsRes.ok || !quickLinksRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const [eventsData, rsvpsData, carpoolsData, membersData, pollsData, announcementsData, quickLinksData] = await Promise.all([
          eventsRes.json(),
          rsvpsRes.json(),
          carpoolsRes.json(),
          membersRes.json(),
          pollsRes.json(),
          announcementsRes.json(),
          quickLinksRes.json()
        ])
        
        setEvents(eventsData)
        // Convert RSVPs array to a map for easy lookup
        const rsvpMap = rsvpsData.reduce((acc: Record<string, RSVP>, rsvp: RSVP) => {
          acc[rsvp.eventId] = rsvp
          return acc
        }, {})
        setRsvps(rsvpMap)
        setCarpools(carpoolsData)
        setMembers(membersData)
        setPolls(pollsData)
        setAnnouncements(announcementsData)
        setQuickLinks(quickLinksData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch weather'))
      .then(setWeather)
      .catch(() => setWeatherError('Failed to fetch weather'))
      .finally(() => setWeatherLoading(false))
  }, [])

  async function handleRSVP(eventId: string, status: 'ATTENDING' | 'NOT_ATTENDING') {
    if (!user) {
      setError('Please sign in to RSVP')
      return
    }

    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ status })
      })

      if (!res.ok) {
        throw new Error('Failed to update RSVP')
      }

      const newRsvp = await res.json()
      setRsvps(prev => ({
        ...prev,
        [eventId]: newRsvp
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update RSVP')
    }
  }

  async function handleNeedRide(eventId: string) {
    if (!user) {
      setError('Please sign in to request a ride')
      return
    }

    try {
      const res = await fetch('/api/ride-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      })

      if (!res.ok) {
        throw new Error('Failed to request ride')
      }

      // Refresh carpools to show updated status
      const carpoolsRes = await fetch('/api/carpools')
      if (carpoolsRes.ok) {
        const carpoolsData = await carpoolsRes.json()
        setCarpools(carpoolsData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request ride')
    }
  }

  async function handleOfferRide(eventId: string, maxPassengers: number) {
    if (!user) {
      setError('Please sign in to offer a ride')
      return
    }

    try {
      const res = await fetch('/api/carpools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, maxPassengers })
      })

      if (!res.ok) {
        throw new Error('Failed to offer ride')
      }

      // Refresh carpools to show new carpool
      const carpoolsRes = await fetch('/api/carpools')
      if (carpoolsRes.ok) {
        const carpoolsData = await carpoolsRes.json()
        setCarpools(carpoolsData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to offer ride')
    }
  }

  async function handlePollVote(poll: Poll, selectedIdxs: number[]) {
    if (!user) {
      setError('Please sign in to vote')
      return
    }
    try {
      // For single-choice polls, send one index; for multiple, send all
      const optionIdx = poll.multipleChoice ? selectedIdxs : selectedIdxs[0]
      const res = await fetch(`/api/polls/${poll.id}/vote`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ optionIdx })
      })
      if (!res.ok) throw new Error('Failed to vote')
      const pollsRes = await fetch('/api/polls')
      if (pollsRes.ok) setPolls(await pollsRes.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to vote')
    }
  }

  async function handleCreatePoll() {
    if (!user) {
      setError('Please sign in to create a poll')
      return
    }
    try {
      const res = await authFetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPoll),
      })
      if (!res.ok) throw new Error('Failed to create poll')
      const pollsRes = await fetch('/api/polls')
      if (pollsRes.ok) setPolls(await pollsRes.json())
      setNewPoll({ question: '', options: ['', ''], expiresAt: '', multipleChoice: false })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create poll')
    }
  }

  async function handleClosePoll(pollId: string) {
    if (!user) {
      setError('Please sign in as admin to close poll')
      return
    }
    try {
      const idToken = await user.getIdToken()
      const res = await fetch(`/api/polls/${pollId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ userId: user.uid })
      })
      if (!res.ok) throw new Error('Failed to close poll')
      const pollsRes = await fetch('/api/polls')
      if (pollsRes.ok) setPolls(await pollsRes.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to close poll')
    }
  }

  async function handleCreateAnnouncement() {
    if (!user) {
      setError('Please sign in to post an announcement')
      return
    }
    try {
      const res = await authFetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          author: user.displayName || 'Admin',
        }),
      })
      if (!res.ok) throw new Error('Failed to post announcement')
      const announcementsRes = await fetch('/api/announcements')
      if (announcementsRes.ok) setAnnouncements(await announcementsRes.json())
      setNewAnnouncement({ title: '', content: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post announcement')
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' })
  }

  function formatTime(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  function PollBar({ count, total, label, isWinning = false }: { count: number; total: number; label: string; isWinning?: boolean }) {
    const percent = total > 0 ? (count / total) * 100 : 0
    return (
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-blue-800 font-medium">{label}</span>
          <span className="text-gray-500">{count} vote{count !== 1 ? 's' : ''}</span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-3">
          <div
            className={`${isWinning ? 'bg-green-600' : 'bg-blue-700'} h-3 rounded-full transition-all`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    )
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    setContactLoading(true)
    setContactStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      })
      if (!res.ok) throw new Error('Failed to send message')
      setContactStatus('Message sent!')
      setContactForm({ name: '', email: '', message: '' })
    } catch {
      setContactStatus('Failed to send message')
    } finally {
      setContactLoading(false)
    }
  }

  async function handleAddQuickLink() {
    if (!user || user.email !== 'admin@saves.org') return
    try {
      const res = await fetch('/api/quick-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuickLink)
      })
      if (!res.ok) throw new Error('Failed to add link')
      setQuickLinks(await res.json())
      setNewQuickLink({ label: '', url: '' })
    } catch {}
  }

  async function handleEditQuickLink(link: QuickLink) {
    if (!user || user.email !== 'admin@saves.org') return
    try {
      const res = await authFetch(`/api/quick-links/${link.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link),
      })
      if (!res.ok) throw new Error('Failed to edit link')
      setQuickLinks(await res.json())
      setEditingQuickLink(null)
    } catch {}
  }

  async function handleDeleteQuickLink(id: string) {
    if (!user || user.email !== 'admin@saves.org') return
    try {
      const res = await authFetch(`/api/quick-links/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete link')
      setQuickLinks(await res.json())
    } catch {}
  }

  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault()
    setEventLoading(true)
    try {
      const res = await authFetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      })
      if (!res.ok) throw new Error('Failed to create event')
      const eventsRes = await fetch('/api/events')
      if (eventsRes.ok) setEvents(await eventsRes.json())
      setShowCreateEvent(false)
      setNewEvent({ title: '', date: '', time: '', description: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event')
    } finally {
      setEventLoading(false)
    }
  }

  async function handleAddMember(e: React.FormEvent) {
    e.preventDefault()
    setMemberLoading(true)
    try {
      const res = await authFetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      })
      if (!res.ok) throw new Error('Failed to add member')
      const membersRes = await fetch('/api/members')
      if (membersRes.ok) setMembers(await membersRes.json())
      setShowAddMember(false)
      setNewMember({ name: '', email: '', role: 'MEMBER', password: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add member')
    } finally {
      setMemberLoading(false)
    }
  }

  async function handleDeleteEvent(eventId: string) {
    if (!user) {
      setError('Please sign in to delete event')
      return
    }
    try {
      const idToken = await user.getIdToken()
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to delete event')
        throw new Error('Failed to delete event')
      }
      // Refresh events after deletion
      const eventsRes = await fetch('/api/events')
      if (eventsRes.ok) setEvents(await eventsRes.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event')
    }
  }

  async function handleDeleteAnnouncement(id: string) {
    if (!user || !isAdmin) return
    try {
      const idToken = await user.getIdToken()
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${idToken}` },
      })
      if (!res.ok) {
        const errorData = await res.json()
        setError(errorData.error || 'Failed to delete announcement')
        throw new Error('Failed to delete announcement')
      }
      // Refresh announcements
      const announcementsRes = await fetch('/api/announcements')
      if (announcementsRes.ok) setAnnouncements(await announcementsRes.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete announcement')
    }
  }

  if (authLoading) {
    return <div className="min-h-screen bg-blue-900 flex items-center justify-center text-white text-xl">Loading...</div>
  }
  if (!user) {
    return null // or a loading spinner
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <>
      {/* Watermark background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full"
        style={{
          background: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          pointerEvents: 'none',
          zIndex: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {watermarkLines}
      </div>
      <div className="min-h-screen bg-blue-900/95 flex flex-col items-center pt-16 px-2 relative overflow-hidden">
        <Navigation />
        {/* Spinning Logo */}
        <motion.div
          ref={logoRef}
          className="fixed top-1/3 left-[-350px] z-0 pointer-events-none select-none transform -translate-y-1/3 hidden sm:block"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
        >
          <img src="/image.png" alt="SAVES Logo" style={{ width: 700, opacity: 0.07 }} />
        </motion.div>
        <main className="w-full flex flex-col items-center relative z-10">
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="flex w-full max-w-6xl gap-6 mt-20"
            columnClassName="masonry-column flex flex-col gap-6"
          >
            {/* Members Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col max-h-56 w-full md:w-auto mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50" style={{ minWidth: 0 }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-blue-900">Members</h2>
                {isAdmin && (
                  <button onClick={() => setShowAddMember(true)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">+ Add Member</button>
                )}
              </div>
              {/* Add Member Modal */}
              {showAddMember && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <form onSubmit={handleAddMember} className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl flex flex-col gap-3">
                    <h3 className="text-lg font-bold mb-2">Add Member</h3>
                    <input type="text" placeholder="Name" value={newMember.name} onChange={e => setNewMember(m => ({ ...m, name: e.target.value }))} className="border rounded px-2 py-1" required />
                    <input type="email" placeholder="Email" value={newMember.email} onChange={e => setNewMember(m => ({ ...m, email: e.target.value }))} className="border rounded px-2 py-1" required />
                    <input type="password" placeholder="Password" value={newMember.password} onChange={e => setNewMember(m => ({ ...m, password: e.target.value }))} className="border rounded px-2 py-1" required />
                    <select value={newMember.role} onChange={e => setNewMember(m => ({ ...m, role: e.target.value }))} className="border rounded px-2 py-1">
                      <option value="MEMBER">Member</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                    <div className="flex gap-2 mt-2">
                      <button type="submit" disabled={memberLoading} className="bg-blue-600 text-white px-4 py-1 rounded">{memberLoading ? 'Adding...' : 'Add'}</button>
                      <button type="button" onClick={() => setShowAddMember(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              <ul>
                {members.map(member => (
                  <li key={member.id} className="mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="flex items-center mr-2">
                        <FaUser color="#1d4ed8" size={20} />
                      </span>
                      <span className="font-medium text-blue-900">{member.name}</span>
                      <span className="ml-2 text-xs text-gray-500">{member.role}</span>
                      {member.rideStatus && (
                        <span className={`ml-2 text-xs flex items-center ${
                          member.rideStatus === 'OFFERING' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          <FaCarSide color={member.rideStatus === 'OFFERING' ? '#22c55e' : '#eab308'} size={16} />
                          {member.rideStatus === 'OFFERING' ? 'Offering Ride' : 'Needs Ride'}
                        </span>
                      )}
                    </span>
                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <select 
                          value={member.role}
                          onChange={async (e) => {
                            try {
                              const res = await fetch(`/api/members/${member.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ role: e.target.value })
                              })
                              if (res.ok) {
                                const updatedMember = await res.json()
                                setMembers(prev => prev.map(m => 
                                  m.id === member.id ? updatedMember : m
                                ))
                              }
                            } catch (err) {
                              setError('Failed to update member role')
                            }
                          }}
                          className="ml-2 border rounded px-1 text-xs"
                        >
                          <option value="ADMIN">Admin</option>
                          <option value="MEMBER">Member</option>
                        </select>
                        <button
                          className="ml-2 text-xs text-red-600 hover:underline"
                          onClick={async () => {
                            if (!window.confirm('Are you sure you want to delete this user?')) return;
                            try {
                              const idToken = await user.getIdToken();
                              const res = await fetch(`/api/members/${member.id}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${idToken}` },
                              });
                              if (res.ok) {
                                setMembers(prev => prev.filter(m => m.id !== member.id));
                              } else {
                                const data = await res.json();
                                setError(data.error || 'Failed to delete user');
                              }
                            } catch (err) {
                              setError('Failed to delete user');
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* Events Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col mb-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-blue-900">Upcoming Events</h2>
                {isAdmin && (
                  <button onClick={() => setShowCreateEvent(true)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">+ Create Event</button>
                )}
              </div>
              {/* Create Event Modal */}
              {showCreateEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <form onSubmit={handleCreateEvent} className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl flex flex-col gap-3">
                    <h3 className="text-lg font-bold mb-2">Create Event</h3>
                    <input type="text" placeholder="Title" value={newEvent.title} onChange={e => setNewEvent(ev => ({ ...ev, title: e.target.value }))} className="border rounded px-2 py-1" required />
                    <input type="date" value={newEvent.date} onChange={e => setNewEvent(ev => ({ ...ev, date: e.target.value }))} className="border rounded px-2 py-1" required />
                    <input type="time" value={newEvent.time} onChange={e => setNewEvent(ev => ({ ...ev, time: e.target.value }))} className="border rounded px-2 py-1" required />
                    <textarea placeholder="Description" value={newEvent.description} onChange={e => setNewEvent(ev => ({ ...ev, description: e.target.value }))} className="border rounded px-2 py-1" rows={2} required />
                    <div className="flex gap-2 mt-2">
                      <button type="submit" disabled={eventLoading} className="bg-blue-600 text-white px-4 py-1 rounded">{eventLoading ? 'Creating...' : 'Create'}</button>
                      <button type="button" onClick={() => setShowCreateEvent(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              <ul>
                {events.map(event => (
                  <li key={event.id} className="mb-4">
                    <EventCard
                      event={event}
                      onDelete={isAdmin ? () => handleDeleteEvent(event.id) : undefined}
                      onRSVP={user ? (status) => handleRSVP(event.id, status) : undefined}
                      onRequestRide={() => handleNeedRide(event.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            {/* Polls Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2 text-blue-900">Active Polls</h2>
              {polls.map(poll => {
                // Check expiration
                const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
                if (!poll.isActive || isExpired) return null
                const totalVotes = poll.votes.length
                const optionVotes = poll.options.map((_, idx) =>
                  poll.votes.filter(v => v.optionIdx === idx).length
                )
                const userVotes = poll.votes.filter(v => v.userId === user.uid).map(v => v.optionIdx)
                const isMultiple = poll.multipleChoice
                return (
                  <div key={poll.id} className="mb-4">
                    <div className="font-bold mb-2">{poll.question}</div>
                    {poll.expiresAt && (
                      <div className="text-xs text-gray-500 mb-1">Expires: {formatDate(poll.expiresAt)} {formatTime(poll.expiresAt)}</div>
                    )}
                    <ul>
                      {poll.options.map((opt, idx) => (
                        <li key={idx} className="mb-2">
                          <PollBar count={optionVotes[idx]} total={totalVotes} label={opt} isWinning={optionVotes[idx] === Math.max(...optionVotes) && totalVotes > 0} />
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {isMultiple ? (
                        <>
                          {poll.options.map((opt, idx) => (
                            <label key={idx} className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={selectedOptions[poll.id]?.includes(idx) || userVotes.includes(idx)}
                                onChange={e => {
                                  setSelectedOptions(prev => {
                                    const prevSelected = prev[poll.id] || []
                                    return {
                                      ...prev,
                                      [poll.id]: e.target.checked
                                        ? [...prevSelected, idx]
                                        : prevSelected.filter(i => i !== idx)
                                    }
                                  })
                                }}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                          <button
                            onClick={() => handlePollVote(poll, selectedOptions[poll.id] || [])}
                            className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Submit Vote
                          </button>
                        </>
                      ) : (
                        poll.options.map((opt, idx) => {
                          const isWinning = optionVotes[idx] === Math.max(...optionVotes) && totalVotes > 0;
                          const isUserVote = userVotes[0] === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handlePollVote(poll, [idx])}
                              className={`px-4 py-1 rounded transition ${
                                isUserVote
                                  ? 'bg-blue-600 text-white'
                                  : isWinning
                                  ? 'bg-green-600 text-white'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              Vote for {opt}
                            </button>
                          );
                        })
                      )}
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleClosePoll(poll.id)}
                        className="mt-2 text-xs text-red-600 hover:underline"
                      >
                        Close Poll
                      </button>
                    )}
                  </div>
                )
              })}
              {/* Create Poll Form (Admin Only) */}
              {isAdmin && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-semibold mb-2">Create New Poll</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Poll Question"
                      value={newPoll.question}
                      onChange={e => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="datetime-local"
                      value={newPoll.expiresAt}
                      onChange={e => setNewPoll(prev => ({ ...prev, expiresAt: e.target.value }))}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPoll.multipleChoice}
                        onChange={e => setNewPoll(prev => ({ ...prev, multipleChoice: e.target.checked }))}
                      />
                      Allow multiple choices
                    </label>
                    {newPoll.options.map((opt, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Option ${idx + 1}`}
                          value={opt}
                          onChange={e => {
                            const newOptions = [...newPoll.options]
                            newOptions[idx] = e.target.value
                            setNewPoll(prev => ({ ...prev, options: newOptions }))
                          }}
                          className="flex-1 border rounded px-2 py-1 text-sm"
                        />
                        {idx > 1 && (
                          <button
                            onClick={() => {
                              const newOptions = newPoll.options.filter((_, i) => i !== idx)
                              setNewPoll(prev => ({ ...prev, options: newOptions }))
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    {newPoll.options.length < 5 && (
                      <button
                        onClick={() => setNewPoll(prev => ({ ...prev, options: [...prev.options, ''] }))}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Add Option
                      </button>
                    )}
                    <button
                      onClick={handleCreatePoll}
                      disabled={!newPoll.question.trim() || newPoll.options.filter(opt => opt.trim() !== '').length < 2}
                      className="w-full bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Create Poll
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Announcements Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2 text-blue-900">Announcements</h2>
              {announcements.length === 0 && <div className="text-gray-500">No announcements yet.</div>}
              <ul>
                {announcements.map(a => (
                  <li key={a.id} className="mb-4 border-b pb-2">
                    <div className="font-bold text-blue-900">{a.title}</div>
                    <div className="text-gray-700 text-sm mb-1">{a.content}</div>
                    <div className="text-xs text-gray-400">By {a.author} • {formatDate(a.createdAt)} {formatTime(a.createdAt)}</div>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteAnnouncement(a.id)}
                        className="mt-1 text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isAdmin && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-semibold mb-2">Post Announcement</h3>
                  <input
                    type="text"
                    placeholder="Title"
                    value={newAnnouncement.title}
                    onChange={e => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border rounded px-2 py-1 text-sm mb-2"
                  />
                  <textarea
                    placeholder="Content"
                    value={newAnnouncement.content}
                    onChange={e => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full border rounded px-2 py-1 text-sm mb-2"
                    rows={2}
                  />
                  <button
                    onClick={handleCreateAnnouncement}
                    disabled={!newAnnouncement.title.trim() || !newAnnouncement.content.trim()}
                    className="w-full bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
            {/* Weather Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col mb-2 items-center">
              <h2 className="text-xl font-semibold mb-2 text-blue-900">Weather</h2>
              {weatherLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : weatherError ? (
                <div className="text-red-500">{weatherError}</div>
              ) : weather ? (
                <div className="flex flex-col items-center">
                  <img src={weather.icon} alt={weather.condition} className="w-16 h-16 mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{weather.temperature}&deg;F</div>
                  <div className="text-blue-700">{weather.condition}</div>
                </div>
              ) : null}
            </div>
            {/* Quick Links Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2 text-blue-900">Quick Links</h2>
              <ul className="list-disc pl-5 text-blue-700">
                {quickLinks.map(link => (
                  <li key={link.id} className="mb-1 flex items-center gap-2">
                    {editingQuickLink?.id === link.id ? (
                      <div className="flex items-center gap-2 w-full max-w-full flex-wrap">
                        <input
                          type="text"
                          value={editingQuickLink.label}
                          onChange={e => setEditingQuickLink(l => l && ({ ...l, label: e.target.value }))}
                          className="border rounded px-1 text-sm w-24 max-w-[100px]"
                          style={{ minWidth: 0 }}
                        />
                        <input
                          type="text"
                          value={editingQuickLink.url}
                          onChange={e => setEditingQuickLink(l => l && ({ ...l, url: e.target.value }))}
                          className="border rounded px-1 text-sm w-40 max-w-[180px]"
                          style={{ minWidth: 0 }}
                        />
                        <button onClick={() => handleEditQuickLink(editingQuickLink)} className="text-green-600 text-xs ml-1">Save</button>
                        <button onClick={() => setEditingQuickLink(null)} className="text-gray-500 text-xs ml-1">Cancel</button>
                      </div>
                    ) : (
                      <>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{link.label}</a>
                        {isAdmin && (
                          <>
                            <button onClick={() => setEditingQuickLink(link)} className="text-blue-600 text-xs">Edit</button>
                            <button onClick={() => handleDeleteQuickLink(link.id)} className="text-red-600 text-xs">Delete</button>
                          </>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {isAdmin && (
                <div className="mt-2 flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Label"
                    value={newQuickLink.label}
                    onChange={e => setNewQuickLink(l => ({ ...l, label: e.target.value }))}
                    className="border rounded px-1 text-sm w-28"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={newQuickLink.url}
                    onChange={e => setNewQuickLink(l => ({ ...l, url: e.target.value }))}
                    className="border rounded px-1 text-sm w-48"
                  />
                  <button onClick={handleAddQuickLink} className="text-blue-600 text-xs">Add</button>
                </div>
              )}
            </div>
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2 text-blue-900">Contact</h2>
              <div className="mb-2">
                <div className="text-blue-700 font-medium">Email:</div>
                <a href="mailto:saves@etal.uri.edu" className="text-blue-900 hover:underline">saves@etal.uri.edu</a>
              </div>
              <div className="mb-2">
                <div className="text-blue-700 font-medium">Instagram:</div>
                <a href="https://instagram.com/urisa.ves" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:underline">@urisa.ves</a>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border rounded px-2 py-1 text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border rounded px-2 py-1 text-sm"
                  required
                />
                <textarea
                  placeholder="Message"
                  value={contactForm.message}
                  onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full border rounded px-2 py-1 text-sm"
                  rows={2}
                  required
                />
                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {contactLoading ? 'Sending...' : 'Send'}
                </button>
                {contactStatus && <div className="text-xs mt-1 text-center text-blue-700">{contactStatus}</div>}
              </form>
            </div>
          </Masonry>
        </main>
      </div>
    </>
  )
}