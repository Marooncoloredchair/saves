import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;

    const { eventId, capacity } = await req.json();
    if (!eventId || typeof capacity !== 'number' || capacity < 1) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    // Ensure user exists
    const user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Ensure event exists
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const offer = await prisma.rideOffer.create({
      data: {
        eventId,
        driverId: firebaseUid,
        capacity,
      },
    });
    return NextResponse.json(offer);
  } catch (error: any) {
    console.error('POST /api/ride-offers error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 