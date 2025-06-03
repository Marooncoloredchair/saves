import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminAuth } from '@/lib/firebaseAdmin';
import validator from 'validator';


// Dummy admin check (replace with real session/user check in production)
async function isAdmin(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user?.role === 'ADMIN';
}

export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      where: { isActive: true },
      include: { votes: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(polls);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;
    const email = decoded.email;

    // Ensure admin user exists in DB
    let user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUid,
          name: email || 'Admin',
          email: email || `admin+${firebaseUid}@example.com`,
          password: '',
          role: 'ADMIN',
        },
      });
      console.log('Auto-provisioned admin user:', user.email);
    }

    if (user.role !== 'ADMIN' && email !== 'admin@saves.org') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { question, options } = await req.json();
    if (!validator.isLength(question, { min: 1, max: 200 }) || !Array.isArray(options) || options.length < 2) {
      return NextResponse.json({ error: 'Invalid poll data' }, { status: 400 });
    }
    const poll = await prisma.poll.create({
      data: {
        question,
        options,
        createdById: firebaseUid,
      },
    });
    return NextResponse.json(poll);
  } catch (error: any) {
    console.error('POST /api/polls error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 