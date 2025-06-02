import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';

const prisma = new PrismaClient();

type RouteSegmentProps = {
  params: {
    id: string;
  };
};

export async function DELETE(
  request: NextRequest,
  props: RouteSegmentProps
) {
  try {
    const authHeader = request.headers.get('authorization');
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

    await prisma.announcement.delete({ where: { id: props.params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/announcements/[id] error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 