'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

interface AnnouncementCardProps {
  announcement: Announcement
  onDelete?: () => void
}

export default function AnnouncementCard({ announcement, onDelete }: AnnouncementCardProps) {
  const { user } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!onDelete) return
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
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
      <p className="text-gray-600 mb-4">{announcement.content}</p>
      <div className="text-sm text-gray-500">
        Posted by {announcement.author} on {new Date(announcement.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
} 