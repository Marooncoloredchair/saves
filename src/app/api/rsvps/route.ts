import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { adminAuth } from '@/lib/firebaseAdmin'
import validator from 'validator'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const rsvps = await prisma.rSVP.findMany()
    return NextResponse.json(rsvps)
  } catch (error: any) {
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
    const name = decoded.name || email || 'User'

    // Ensure user exists in DB (provision as MEMBER if not present)
    let user = await prisma.user.findUnique({ where: { id: firebaseUid } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUid,
          name,
          email: email || `user+${firebaseUid}@example.com`,
          password: '',
          role: 'MEMBER',
        },
      })
      console.log('Auto-provisioned RSVP user:', user.email)
    }

    const { eventId, status } = await req.json()
    if (!eventId || !validator.isLength(status || '', { min: 1, max: 20 })) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }
    // Upsert RSVP for this user/event
    const rsvp = await prisma.rSVP.upsert({
      where: { userId_eventId: { userId: firebaseUid, eventId } },
      update: { status },
      create: { userId: firebaseUid, eventId, status },
    })
    return NextResponse.json(rsvp)
  } catch (error: any) {
    console.error('POST /api/rsvps error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 