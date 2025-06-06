import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { adminAuth } from '@/lib/firebaseAdmin'

export async function GET() {
  try {
    const carpools = await prisma.carpool.findMany({
      include: {
        driver: true,
        passengers: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(carpools)
  } catch (error: any) {
    console.error('GET /api/carpools error:', error)
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

    const { eventId, maxPassengers, pickupLocation, pickupTime } = await req.json()

    // Validate input
    if (!eventId || !maxPassengers || !pickupLocation || !pickupTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create carpool
    const carpool = await prisma.carpool.create({
      data: {
        eventId,
        maxPassengers: parseInt(maxPassengers),
        pickupLocation,
        pickupTime,
        driverId: firebaseUid,
      },
      include: {
        driver: true,
        passengers: true,
      },
    })

    return NextResponse.json(carpool)
  } catch (error: any) {
    console.error('POST /api/carpools error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 