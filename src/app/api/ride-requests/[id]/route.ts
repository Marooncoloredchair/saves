import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const rideRequest = await prisma.rideRequest.findUnique({ where: { id: params.id } });
    if (!rideRequest) return NextResponse.json({ error: 'Ride request not found' }, { status: 404 });
    return NextResponse.json(rideRequest);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const rideRequest = await prisma.rideRequest.update({ where: { id: params.id }, data });
    return NextResponse.json(rideRequest);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;

    // Get ride request
    const rideRequest = await prisma.rideRequest.findUnique({ where: { id: params.id } });
    if (!rideRequest) {
      return NextResponse.json({ error: 'Ride request not found' }, { status: 404 });
    }

    // Get user
    const user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    if (!user || (user.role !== 'ADMIN' && rideRequest.userId !== firebaseUid)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.rideRequest.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 