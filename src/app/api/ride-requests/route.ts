import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminAuth } from '@/lib/firebaseAdmin'
import validator from 'validator'


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
      console.log('Auto-provisioned ride request user:', user.email)
    }

    const { eventId, pickupLocation } = await req.json()
    if (!eventId || !validator.isLength(pickupLocation || '', { min: 1, max: 200 })) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }
    const rideRequest = await prisma.rideRequest.create({
      data: {
        eventId,
        userId: firebaseUid,
        pickupLocation,
      },
    })
    return NextResponse.json(rideRequest)
  } catch (error: any) {
    console.error('POST /api/ride-requests error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 