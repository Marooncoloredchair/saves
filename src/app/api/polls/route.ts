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

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;

    // Ensure user exists in DB
    let user = await prisma.user.findUnique({ where: { id: firebaseUid } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUid,
          name: decoded.email || 'User',
          email: decoded.email || `user+${firebaseUid}@example.com`,
          password: '',
          role: 'MEMBER',
        },
      });
    }

    const { pollId, selectedOptions } = await req.json();
    
    // Validate poll exists and is active
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { votes: true }
    });

    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    if (!poll.isActive) {
      return NextResponse.json({ error: 'Poll is no longer active' }, { status: 400 });
    }

    // Check if user has already voted
    const existingVote = poll.votes.find(vote => vote.userId === firebaseUid);
    if (existingVote && !poll.multipleChoice) {
      return NextResponse.json({ error: 'You have already voted on this poll' }, { status: 400 });
    }

    // Validate selected options
    if (!Array.isArray(selectedOptions) || selectedOptions.length === 0) {
      return NextResponse.json({ error: 'Invalid vote data' }, { status: 400 });
    }

    // Create votes
    const votes = await Promise.all(
      selectedOptions.map(optionIdx =>
        prisma.pollVote.create({
          data: {
            pollId,
            userId: firebaseUid,
            optionIdx
          }
        })
      )
    );

    // Return updated poll
    const updatedPoll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { votes: true }
    });

    return NextResponse.json(updatedPoll);
  } catch (error: any) {
    console.error('PUT /api/polls error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 