'use client'
import { useRef, useState, useEffect } from 'react'
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
import AnimatedShapesBackground from '@/components/AnimatedShapesBackground'
import useSWR, { mutate } from 'swr'

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
  availableSeats: number
  pickupLocation: string
  pickupTime: string
}

interface Member {
  id: string
  name: string
  email: string
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

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function DashboardPage() {
  const logoRef = useRef<HTMLDivElement>(null)
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''], expiresAt: '', multipleChoice: false })
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number[]>>({})
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' })
  const [weather, setWeather] = useState<Weather | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactLoading, setContactLoading] = useState(false)
  const [newQuickLink, setNewQuickLink] = useState({ label: '', url: '' })
  const [editingQuickLink, setEditingQuickLink] = useState<QuickLink | null>(null)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '' })
  const [eventLoading, setEventLoading] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'MEMBER', password: '' })
  const [memberLoading, setMemberLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showOfferRideModal, setShowOfferRideModal] = useState(false)
  const [offerRideForm, setOfferRideForm] = useState({ maxPassengers: '', pickupLocation: '', pickupTime: '' })
  const [offerRideLoading, setOfferRideLoading] = useState(false)
  const [showNeedRideModal, setShowNeedRideModal] = useState(false)
  const [needRidePickup, setNeedRidePickup] = useState('')
  const [needRideLoading, setNeedRideLoading] = useState(false)

  // Use SWR for data fetching
  const { data: eventsData, error: eventsError } = useSWR<Event[]>('/api/events', fetcher)
  const events = Array.isArray(eventsData) ? eventsData : []
  const { data: rsvpsData = [], error: rsvpsError } = useSWR<RSVP[]>('/api/rsvps', fetcher)
  const { data: carpools = [], error: carpoolsError } = useSWR<Carpool[]>('/api/carpools', fetcher)
  const { data: members = [], error: membersError } = useSWR<Member[]>('/api/members', fetcher)
  const { data: polls = [], error: pollsError } = useSWR<Poll[]>('/api/polls', fetcher)
  const { data: announcements, error: announcementsError, isLoading: announcementsLoading } = useSWR<Announcement[]>('/api/announcements', fetcher)
  const { data: quickLinks = [], error: quickLinksError } = useSWR<QuickLink[]>('/api/quick-links', fetcher)

  // Convert RSVPs array to a map for easy lookup
  const rsvps = rsvpsData.reduce((acc: Record<string, RSVP>, rsvp: RSVP) => {
    acc[rsvp.eventId] = rsvp
    return acc
  }, {})

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin')
    } else if (user) {
      setIsAdmin(user.email === 'admin@saves.org')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch weather'))
      .then(setWeather)
      .catch(() => setWeatherError('Failed to fetch weather'))
      .finally(() => setWeatherLoading(false))
  }, [])

  useEffect(() => {
    if (error) {
      setShowToast(true)
      const timer = setTimeout(() => setShowToast(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    window.addEventListener('storage', check)
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      window.removeEventListener('storage', check)
      observer.disconnect()
    }
  }, [])

  // Check for any errors
  useEffect(() => {
    const errors = [
      eventsError,
      rsvpsError,
      carpoolsError,
      membersError,
      pollsError,
      announcementsError,
      quickLinksError
    ].filter(Boolean)

    if (errors.length > 0) {
      setError('Failed to fetch some data. Please refresh the page.')
    }
  }, [eventsError, rsvpsError, carpoolsError, membersError, pollsError, announcementsError, quickLinksError])

  // Add debugging
  useEffect(() => {
    console.log('Announcements data:', announcements)
    console.log('Announcements type:', typeof announcements)
    console.log('Is array?', Array.isArray(announcements))
  }, [announcements])

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
    setShowNeedRideModal(true)
  }

  async function submitNeedRide(eventId: string) {
    if (!user) {
      setError('Please sign in to request a ride')
      return
    }
    setNeedRideLoading(true)
    try {
      const res = await fetch('/api/ride-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await user.getIdToken()}` },
        body: JSON.stringify({ eventId, pickupLocation: needRidePickup }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to request ride')
        return
      }
      // Refresh members to update 'Members Needing a Ride' list
      const membersRes = await fetch('/api/members')
      if (membersRes.ok) {
        setMembers(await membersRes.json())
      }
      setShowNeedRideModal(false)
      setNeedRidePickup('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request ride')
    } finally {
      setNeedRideLoading(false)
    }
  }

  async function handleOfferRide(eventId: string) {
    if (!user) {
      setError('Please sign in to offer a ride')
      return
    }
    setOfferRideLoading(true)
    try {
      const res = await fetch('/api/carpools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          maxPassengers: parseInt(offerRideForm.maxPassengers),
          pickupLocation: offerRideForm.pickupLocation,
          pickupTime: offerRideForm.pickupTime,
          driverId: user.uid,
        }),
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
      setShowOfferRideModal(false)
      setOfferRideForm({ maxPassengers: '', pickupLocation: '', pickupTime: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to offer ride')
    } finally {
      setOfferRideLoading(false)
    }
  }

  async function handlePollVote(poll: Poll, selectedIdxs: number[]) {
    if (!user) {
      setError('Please sign in to vote')
      return
    }
    try {
      const res = await fetch('/api/polls', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ 
          pollId: poll.id,
          selectedOptions: selectedIdxs
        })
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to vote')
      }
      // Update the polls data
      await mutate('/api/polls')
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
          content: newAnnouncement.content
        }),
      })
      if (!res.ok) throw new Error('Failed to post announcement')
      
      // Invalidate and revalidate the announcements data
      await mutate('/api/announcements')
      setNewAnnouncement({ title: '', content: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post announcement')
    }
  }

  async function handleDeleteAnnouncement(id: string) {
    if (!user || !isAdmin) return
    try {
      const res = await authFetch(`/api/announcements/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        const errorData = await res.json()
        setError(errorData.error || 'Failed to delete announcement')
        throw new Error('Failed to delete announcement')
      }
      // Update UI immediately
      await mutate('/api/announcements')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete announcement')
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
      await mutate('/api/events')
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

  // Add joinCarpool function
  async function joinCarpool(carpoolId: string) {
    if (!user) {
      setError('Please sign in to join a carpool');
      return;
    }
    try {
      const res = await fetch(`/api/carpools/${carpoolId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to join carpool');
        return;
      }
      // Refresh carpools
      const carpoolsRes = await fetch('/api/carpools');
      if (carpoolsRes.ok) {
        setCarpools(await carpoolsRes.json());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join carpool');
    }
  }

  // Add leaveCarpool function
  async function leaveCarpool(carpoolId: string) {
    if (!user) {
      setError('Please sign in to leave a carpool');
      return;
    }
    try {
      const res = await fetch(`/api/carpools/${carpoolId}/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to leave carpool');
        return;
      }
      // Refresh carpools
      const carpoolsRes = await fetch('/api/carpools');
      if (carpoolsRes.ok) {
        setCarpools(await carpoolsRes.json());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave carpool');
    }
  }

  if (authLoading) {
    return <div className="min-h-screen bg-blue-900 flex items-center justify-center text-white text-xl">Loading...</div>
  }
  if (!user) {
    return null // or a loading spinner
  }

  if (error) {
    // Remove the full error overlay, just return null here
    // Error will be shown as toast instead
    // return (
    //   <div className="min-h-screen bg-blue-900 flex items-center justify-center">
    //     <div className="text-white text-xl">Error: {error}</div>
    //   </div>
    // )
    // Instead, continue rendering the dashboard
  }

  // Find nextEvent at the top of the render function so it can be used in both the carpool card and the Need a Ride modal
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventObjs = events
    .map(ev => ({ ...ev, dateObj: new Date(ev.date) }))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  const nextEvent = eventObjs.find(ev => ev.dateObj >= today);

  return (
    <>
      {/* Toast notification */}
      {showToast && error && (
      <div
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out"
          style={{ minWidth: 220, maxWidth: 350, transition: 'opacity 0.3s' }}
        >
          <span className="flex-1">{error}</span>
          <button
            className="ml-2 text-white text-lg font-bold hover:opacity-70"
            onClick={() => { setShowToast(false); setError(null); }}
            aria-label="Dismiss error"
          >
            ×
          </button>
      </div>
      )}
      {/* Animated 3D shapes background */}
      <AnimatedShapesBackground />
      <div className="min-h-screen" style={{ background: isDark ? 'linear-gradient(135deg, #101624 0%, #1a2233 100%)' : 'linear-gradient(135deg, #e3f1ff 0%, #f9fbff 100%)' }}>
        <Navigation />
        {/* Spinning Logo */}
        <motion.div
          ref={logoRef}
          className="fixed top-1/3 left-[-350px] z-0 pointer-events-none select-none transform -translate-y-1/3 hidden sm:block"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
        >
          <img src="/image.png" alt="SAVES Logo" style={{ width: 700, opacity: isDark ? 0.04 : 0.07, filter: isDark ? 'grayscale(0.7) brightness(0.7)' : 'none' }} />
        </motion.div>
        <main className="w-full flex flex-col items-center relative z-10">
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="flex w-full max-w-6xl gap-6 mt-20"
            columnClassName="masonry-column flex flex-col gap-6"
          >
            {/* Members Card */}
            <div className="card flex flex-col w-full max-w-6xl mb-2" style={{ minWidth: 0 }}>
              <div className="flex items-center justify-between flex-wrap mb-2">
                <h2 className="text-xl font-semibold" style={{ color: '#229eff', letterSpacing: '0.01em', textShadow: '0 2px 8px #e3f1ff' }}>Members</h2>
                {isAdmin && (
                  <button onClick={() => setShowAddMember(true)} className="btn-primary text-sm shadow-lg">+ Add Member</button>
                )}
              </div>
              {/* Add Member Modal */}
              {showAddMember && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                  style={{ alignItems: 'flex-start' }}
                  onClick={() => setShowAddMember(false)}
                >
                  <div style={{ marginTop: '64px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <form
                      onClick={e => e.stopPropagation()}
                      onSubmit={handleAddMember}
                      className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl flex flex-col gap-3"
                      style={{ zIndex: 60 }}
                    >
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
                </div>
              )}
              <ul>
                {members.map(member => (
                  <li
                    key={member.id}
                    className="mb-2 flex flex-wrap items-center justify-between min-w-0"
                    style={{ wordBreak: 'break-word' }}
                  >
                    <span className="flex items-center min-w-0 flex-wrap">
                      <span className="flex items-center mr-2">
                        <FaUser color="#229eff" size={20} />
                      </span>
                      <span className="font-medium" style={{ color: '#229eff', wordBreak: 'break-all' }}>{member.name}</span>
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
                        {/* Only show delete button if not head admin and not yourself */}
                        {member.email !== 'admin@saves.org' && member.id !== user.uid ? (
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
                        ) : member.email === 'admin@saves.org' ? (
                          <span className="ml-2 text-xs text-gray-400" title="Head admin cannot be deleted">Protected</span>
                        ) : null}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* Active Carpools Card */}
            <div className="card flex flex-col w-full max-w-4xl mb-2">
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#229eff', textShadow: '0 2px 8px #e3f1ff' }}>Active Carpools</h2>
              {events.length > 0 ? (() => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const eventObjs = events
                  .map(ev => ({ ...ev, dateObj: new Date(ev.date) }))
                  .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
                const nextEvent = eventObjs.find(ev => ev.dateObj >= today);
                if (!nextEvent) return <div className="text-gray-500">No upcoming events.</div>;
                
                // Carpools for this event
                const eventCarpools = carpools.filter(c => c.eventId === nextEvent.id);
                // Members needing a ride (not in a carpool, rideStatus === 'NEEDS')
                const carpoolPassengerIds = eventCarpools.flatMap(c => c.passengers.map(p => p.id)).concat(eventCarpools.map(c => c.driver.id));
                const needsRide = members.filter(m => m.rideStatus === 'NEEDS' && !carpoolPassengerIds.includes(m.id));
                
                return (
                  <>
                    {/* Offer Ride Modal */}
                    {showOfferRideModal && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                        style={{ alignItems: 'flex-start' }}
                        onClick={() => setShowOfferRideModal(false)}
                      >
                        <div style={{ marginTop: '64px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                          <form
                            onClick={e => e.stopPropagation()}
                            onSubmit={e => { e.preventDefault(); handleOfferRide(nextEvent.id); }}
                            className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl flex flex-col gap-3"
                            style={{ zIndex: 60 }}
                          >
                            <h3 className="text-lg font-bold mb-2">Offer a Ride</h3>
                            <input
                              type="number"
                              min="1"
                              placeholder="Number of seats"
                              value={offerRideForm.maxPassengers}
                              onChange={e => setOfferRideForm(f => ({ ...f, maxPassengers: e.target.value }))}
                              className="border rounded px-2 py-1"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Pickup Location"
                              value={offerRideForm.pickupLocation}
                              onChange={e => setOfferRideForm(f => ({ ...f, pickupLocation: e.target.value }))}
                              className="border rounded px-2 py-1"
                              required
                            />
                            <input
                              type="datetime-local"
                              placeholder="Pickup Time"
                              value={offerRideForm.pickupTime}
                              onChange={e => setOfferRideForm(f => ({ ...f, pickupTime: e.target.value }))}
                              className="border rounded px-2 py-1"
                              required
                            />
                    <div className="flex gap-2 mt-2">
                              <button
                                type="submit"
                                disabled={offerRideLoading || !offerRideForm.maxPassengers || !offerRideForm.pickupLocation || !offerRideForm.pickupTime}
                                className="bg-blue-600 text-white px-4 py-1 rounded"
                              >
                                {offerRideLoading ? 'Offering...' : 'Offer Ride'}
                              </button>
                              <button type="button" onClick={() => setShowOfferRideModal(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
                    </div>
                  </form>
                        </div>
                </div>
              )}
                    <div className="mb-2 text-sm text-gray-600">
                      For event: <span className="font-semibold text-[#229eff]">{nextEvent.title}</span> ({nextEvent.date} {nextEvent.time})
                      </div>
                    {eventCarpools.length === 0 && (
                      <div className="text-gray-500 mb-2">No carpools yet. Be the first to offer a ride!</div>
                    )}
                    <ul className="mb-4">
                      {eventCarpools.map(carpool => {
                        const isPassenger = carpool.passengers.some(p => p.id === user.uid);
                        const isDriver = carpool.driver.id === user.uid;
                        const seatsLeft = carpool.maxPassengers - carpool.passengers.length;
                        return (
                          <li key={carpool.id} className="mb-3 border-b pb-2">
                            <div className="font-bold text-[#229eff]">Driver: {carpool.driver.name}</div>
                            <div className="text-sm text-gray-700 mb-1">
                              Passengers: {carpool.passengers.length > 0 ? carpool.passengers.map(p => p.name).join(', ') : <span className='italic text-gray-400'>None yet</span>}
                        </div>
                            <div className="text-xs text-gray-500 mb-1">
                              Seats: {carpool.maxPassengers} | Seats Left: {seatsLeft}
                            </div>
                            <div className="text-xs text-gray-500 mb-1">
                              Pickup: {carpool.pickupLocation} at {carpool.pickupTime ? new Date(carpool.pickupTime).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : 'N/A'}
                            </div>
                            {/* Join/Leave button logic */}
                            {!isPassenger && !isDriver && seatsLeft > 0 && (
                          <button 
                                className="btn-primary mt-1"
                                onClick={() => joinCarpool(carpool.id)}
                              >
                                Join
                          </button>
                            )}
                            {isPassenger && !isDriver && (
                          <button 
                                className="btn-secondary mt-1"
                                onClick={() => leaveCarpool(carpool.id)}
                              >
                                Leave
                          </button>
                            )}
                            {isPassenger && <div className="text-green-600 text-xs mt-1">You are a passenger</div>}
                            {isDriver && <div className="text-blue-600 text-xs mt-1">You are the driver</div>}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mb-2">
                          <button 
                        className="btn-primary mr-2"
                        onClick={() => setShowOfferRideModal(true)}
                          >
                        Offer a Ride
                          </button>
                          <button 
                        className="btn-secondary"
                        onClick={() => handleNeedRide(nextEvent.id)}
                          >
                            Need a Ride
                          </button>
                        </div>
                    <div className="mt-2">
                      <div className="font-semibold mb-1 text-[#229eff]">Members Needing a Ride:</div>
                      {needsRide.length === 0 ? (
                        <div className="text-gray-500 text-sm">No members currently need a ride.</div>
                      ) : (
                        <ul className="text-sm">
                          {needsRide.map(m => (
                            <li key={m.id} className="mb-1 flex items-center gap-2">
                              <FaUser color="#229eff" size={16} />
                              <span>{m.name} <span className="text-xs text-gray-500">({m.email})</span></span>
                                </li>
                              ))}
                            </ul>
                      )}
                          </div>
                  </>
                );
              })() : <div className="text-gray-500">Loading events...</div>}
            </div>
            {/* Events Card */}
            <div className="card flex flex-col mb-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold mb-2" style={{ color: '#229eff', textShadow: '0 2px 8px #e3f1ff' }}>Upcoming Events</h2>
                {isAdmin && (
                  <button onClick={() => setShowCreateEvent(true)} className="btn-primary text-sm">+ Create Event</button>
                        )}
                      </div>
              {/* Create Event Modal */}
              {showCreateEvent && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                  style={{ alignItems: 'flex-start' }}
                >
                  <div style={{ marginTop: '64px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <form
                      onClick={e => e.stopPropagation()}
                      onSubmit={handleCreateEvent}
                      className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl flex flex-col gap-3"
                      style={{ zIndex: 60 }}
                    >
                      <h3 className="text-lg font-bold mb-2">Create Event</h3>
                      <input type="text" placeholder="Title" value={newEvent.title} onChange={e => setNewEvent(ev => ({ ...ev, title: e.target.value }))} className="border rounded px-2 py-1" required />
                      <input type="date" value={newEvent.date} onChange={e => setNewEvent(ev => ({ ...ev, date: e.target.value }))} className="border rounded px-2 py-1" required />
                      <input type="time" value={newEvent.time} onChange={e => setNewEvent(ev => ({ ...ev, time: e.target.value }))} className="border rounded px-2 py-1" required />
                      <textarea placeholder="Description" value={newEvent.description} onChange={e => setNewEvent(ev => ({ ...ev, description: e.target.value }))} className="border rounded px-2 py-1" rows={2} required />
                      <div className="flex gap-2 mt-2">
                        <button type="submit" disabled={eventLoading} className="btn-primary px-4 py-1 rounded">{eventLoading ? 'Creating...' : 'Create'}</button>
                        <button type="button" onClick={() => setShowCreateEvent(false)} className="btn-secondary px-4 py-1 rounded">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <ul>
                {events.map(event => (
                  <li key={event.id} className="mb-4">
                    <EventCard
                      event={event}
                      onDelete={isAdmin ? () => handleDeleteEvent(event.id) : undefined}
                      onRSVP={user ? (status) => handleRSVP(event.id, status) : undefined}
                    />
                    </li>
                ))}
              </ul>
            </div>
            {/* Polls Card */}
            <div className="card flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#229eff', textShadow: '0 2px 8px #e3f1ff' }}>Active Polls</h2>
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
            <div className="card flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#229eff', textShadow: '0 2px 8px #e3f1ff' }}>Announcements</h2>
              {announcementsLoading ? (
                <div className="text-gray-500">Loading announcements...</div>
              ) : announcementsError ? (
                <div className="text-red-500">Failed to load announcements</div>
              ) : !announcements || !Array.isArray(announcements) ? (
                <div className="text-gray-500">No announcements available</div>
              ) : announcements.length === 0 ? (
                <div className="text-gray-500">No announcements yet.</div>
              ) : (
                <ul>
                  {announcements.map(a => (
                    <li key={a.id} className="mb-4 border-b pb-2">
                      <div className="font-bold" style={{ color: '#229eff' }}>{a.title}</div>
                      <div className="text-gray-700 text-sm mb-1">{a.content}</div>
                      <div className="text-gray-500 text-xs">Posted by {a.author} on {formatDate(a.createdAt)}</div>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteAnnouncement(a.id)}
                          className="text-red-600 hover:text-red-700 text-xs font-medium mt-1"
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
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
            <div className="card flex flex-col mb-2 items-center">
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#229eff', textShadow: '0 2px 8px #e3f1ff' }}>Weather</h2>
              {weatherLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : weatherError ? (
                <div className="text-red-500">{weatherError}</div>
              ) : weather ? (
                <div className="flex flex-col items-center">
                  <img src={weather.icon} alt={weather.condition} className="w-16 h-16 mb-2" />
                  <div className="text-2xl font-bold" style={{ color: '#229eff' }}>{weather.temperature}&deg;F</div>
                  <div className="text-[#229eff]">{weather.condition}</div>
                </div>
              ) : null}
            </div>
            {/* Quick Links Card */}
            <div className="card flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#229eff', textShadow: '0 2px 8px #e3f1ff' }}>Quick Links</h2>
              <ul className="list-disc pl-5 text-[#229eff]">
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
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#229eff' }}>{link.label}</a>
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
            <div className="card flex flex-col mb-2">
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#229eff', textShadow: '0 2px 8px #e3f1ff' }}>Contact</h2>
              <div className="mb-2">
                <div className="text-[#229eff] font-medium">Email:</div>
                <a href="mailto:saves@etal.uri.edu" className="text-[#229eff] hover:underline">saves@etal.uri.edu</a>
              </div>
              <div className="mb-2">
                <div className="text-[#229eff] font-medium">Instagram:</div>
                <a href="https://instagram.com/urisa.ves" target="_blank" rel="noopener noreferrer" className="text-[#229eff] hover:underline">@urisa.ves</a>
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
                {contactStatus && <div className="text-xs mt-1 text-center text-[#229eff]">{contactStatus}</div>}
              </form>
            </div>
          </Masonry>
        </main>
      </div>
      {/* Need a Ride Modal */}
      {showNeedRideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" style={{ alignItems: 'flex-start' }} onClick={() => setShowNeedRideModal(false)}>
          <div style={{ marginTop: '64px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <form
              onClick={e => e.stopPropagation()}
              onSubmit={e => { e.preventDefault(); if (nextEvent) submitNeedRide(nextEvent.id); }}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl flex flex-col gap-3"
              style={{ zIndex: 60 }}
            >
              <h3 className="text-lg font-bold mb-2">Request a Ride</h3>
              <input
                type="text"
                placeholder="Pickup Location"
                value={needRidePickup}
                onChange={e => setNeedRidePickup(e.target.value)}
                className="border rounded px-2 py-1"
                required={!nextEvent ? false : true}
                disabled={!nextEvent}
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" disabled={needRideLoading || !needRidePickup || !nextEvent} className="bg-blue-600 text-white px-4 py-1 rounded">
                  {needRideLoading ? 'Requesting...' : 'Request Ride'}
                </button>
                <button type="button" onClick={() => setShowNeedRideModal(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
              </div>
              {!nextEvent && <div className="text-red-600 text-xs mt-2">No upcoming event available.</div>}
            </form>
          </div>
        </div>
      )}
    </>
  )
}
