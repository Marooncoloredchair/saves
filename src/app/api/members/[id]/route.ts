import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';
import validator from 'validator';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const member = await prisma.user.findUnique({ where: { id: params.id } });
    if (!member) return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    return NextResponse.json(member);
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
    const email = decoded.email;
    const name = decoded.name || email || 'User';

    // Ensure user exists in DB (provision as MEMBER if not present)
    let user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUid,
          name,
          email: email || `user+${firebaseUid}@example.com`,
          password: '',
          role: 'MEMBER',
        },
      });
      console.log('Auto-provisioned member user:', user.email);
    }

    const data = await req.json();
    const member = await prisma.user.update({ where: { id: params.id }, data });
    return NextResponse.json(member);
  } catch (error: any) {
    console.error('PUT /api/members/[id] error:', error);
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
    const email = decoded.email;
    const name = decoded.name || email || 'User';

    // Ensure user exists in DB (provision as MEMBER if not present)
    let user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUid,
          name,
          email: email || `user+${firebaseUid}@example.com`,
          password: '',
          role: 'MEMBER',
        },
      });
      console.log('Auto-provisioned member user:', user.email);
    }

    // Only allow admins to delete users
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Only admins can delete users.' }, { status: 403 });
    }

    // Prevent deletion of the head admin account
    const memberToDelete = await prisma.user.findUnique({ where: { id: params.id } });
    if (memberToDelete && memberToDelete.email === 'admin@saves.org') {
      return NextResponse.json({ error: 'Forbidden: Cannot delete the head admin account.' }, { status: 403 });
    }

    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/members/[id] error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { rideStatus } = await req.json();
    const memberId = params.id;
    if (!rideStatus) {
      return NextResponse.json({ error: 'Missing rideStatus' }, { status: 400 });
    }
    const updated = await prisma.user.update({
      where: { id: memberId },
      data: { rideStatus },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PATCH /api/members/[id] error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 