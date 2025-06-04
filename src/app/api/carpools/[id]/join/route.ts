import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req, { params }) {
  try {
    const { userId } = await req.json();
    const carpoolId = params.id;
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
    const carpool = await prisma.carpool.findUnique({
      where: { id: carpoolId },
      include: { passengers: true, driver: true },
    });
    if (!carpool) {
      return NextResponse.json({ error: 'Carpool not found' }, { status: 404 });
    }
    if (carpool.driverId === userId) {
      return NextResponse.json({ error: 'Driver cannot join as passenger' }, { status: 400 });
    }
    if (carpool.passengers.some(p => p.id === userId)) {
      return NextResponse.json({ error: 'Already joined' }, { status: 400 });
    }
    if (carpool.passengers.length >= carpool.maxPassengers) {
      return NextResponse.json({ error: 'Carpool is full' }, { status: 400 });
    }
    // Add user to passengers
    await prisma.carpool.update({
      where: { id: carpoolId },
      data: {
        passengers: {
          connect: { id: userId },
        },
      },
    });
    // Delete any ride requests for this user and event
    await prisma.rideRequest.deleteMany({
      where: {
        userId,
        eventId: carpool.eventId,
      },
    });
    // Return updated carpool
    const updated = await prisma.carpool.findUnique({
      where: { id: carpoolId },
      include: { passengers: true, driver: true },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('POST /api/carpools/[id]/join error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 