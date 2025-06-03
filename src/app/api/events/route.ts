import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminAuth } from '@/lib/firebaseAdmin'
import validator from 'validator'


export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    })
    return NextResponse.json(events)
  } catch (error: any) {
    console.error('GET /api/events error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const idToken = authHeader.split('Bearer ')[1]
    const decoded = await adminAuth.verifyIdToken(idToken)
    const firebaseUid = decoded.uid
    const email = decoded.email

    // Ensure admin user exists in DB
    let user = await prisma.user.findUnique({ where: { id: firebaseUid } })
    if (!user) {
      // Auto-provision admin user if not present
      user = await prisma.user.create({
        data: {
          id: firebaseUid,
          name: email || 'Admin',
          email: email || `admin+${firebaseUid}@example.com`,
          password: '', // Not used for Firebase users
          role: 'ADMIN',
        },
      })
      console.log('Auto-provisioned admin user:', user.email)
    }

    if (user.role !== 'ADMIN' && email !== 'admin@saves.org') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, date, time, description } = await req.json()
    if (
      !validator.isLength(title, { min: 1, max: 100 }) ||
      !validator.isISO8601(date) ||
      !validator.isLength(time, { min: 1, max: 20 }) ||
      !validator.isLength(description, { min: 1, max: 1000 })
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    // Debug log request body
    console.log('Creating event with:', { title, date, time, description, organizerId: firebaseUid })
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        organizerId: firebaseUid,
      } as any,
    })
    return NextResponse.json(event)
  } catch (error: any) {
    console.error('POST /api/events error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 