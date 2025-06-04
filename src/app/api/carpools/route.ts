import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const carpools = await prisma.carpool.findMany({
      include: { passengers: true, driver: true },
    })
    return NextResponse.json(carpools)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('POST /api/carpools body:', body);
    const { eventId, maxPassengers, pickupLocation, pickupTime, driverId } = body;
    if (!eventId || !maxPassengers || !pickupLocation || !pickupTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const carpool = await prisma.carpool.create({
      data: {
        maxPassengers: parseInt(maxPassengers),
        pickupLocation,
        pickupTime: new Date(pickupTime),
        eventId,
        driverId: driverId || 'admin-id',
      },
      include: { passengers: true, driver: true },
    });
    return NextResponse.json(carpool);
  } catch (error) {
    console.error('POST /api/carpools error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 