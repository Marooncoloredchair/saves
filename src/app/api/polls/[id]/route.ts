import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';

const prisma = new PrismaClient();

async function isAdmin(userId: string, email?: string) {
  let user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user && email) {
    user = await prisma.user.create({
      data: {
        id: userId,
        name: email || 'Admin',
        email: email,
        password: '',
        role: 'ADMIN',
      },
    });
    console.log('Auto-provisioned admin user (polls/[id]):', user.email);
  }
  return user?.role === 'ADMIN' || user?.email === 'admin@saves.org';
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const poll = await prisma.poll.findUnique({
      where: { id: params.id },
      include: { votes: true },
    });
    if (!poll) return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    return NextResponse.json(poll);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await req.json();
    if (!await isAdmin(userId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    // Mark poll as inactive instead of deleting
    const pollId = await params.id;
    await prisma.poll.update({ where: { id: pollId }, data: { isActive: false } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 