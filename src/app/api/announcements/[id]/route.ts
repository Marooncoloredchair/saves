import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const isAdmin = session.user.email === 'admin@saves.org'
    if (!isAdmin) {
      return NextResponse.json({ error: 'Only admins can delete announcements' }, { status: 403 })
    }

    const announcement = await prisma.announcement.delete({
      where: { id: params.id }
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('DELETE /api/announcements/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    )
  }
} 