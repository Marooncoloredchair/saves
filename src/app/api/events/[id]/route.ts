import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';
import validator from 'validator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        rsvps: true,
        rideRequests: true,
      },
    });
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;

    // Check if user is admin
    const user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        time: data.time,
      },
    });
    return NextResponse.json(event);
  } catch (error: any) {
    console.error('PUT /api/events/[id] error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;

    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: { organizer: true }
    });

    if (!event) {
      return new NextResponse('Event not found', { status: 404 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    const isAdmin = user?.email === 'admin@saves.org';

    // Only allow deletion by the organizer or admin
    if (event.organizerId !== firebaseUid && !isAdmin) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Delete just the event
    await prisma.event.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 