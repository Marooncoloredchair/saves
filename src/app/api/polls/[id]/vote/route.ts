import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';
import validator from 'validator';

const prisma = new PrismaClient();

export async function POST(req: Request, context: { params: { id: string } }) {
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
      console.log('Auto-provisioned poll vote user:', user.email);
    }

    const { id: pollId } = await context.params;
    const { optionIdx } = await req.json();
    // Check if poll is active
    const poll = await prisma.poll.findUnique({ where: { id: pollId } });
    if (!poll || !poll.isActive) {
      return NextResponse.json({ error: 'Poll not found or inactive' }, { status: 404 });
    }
    if (poll.multipleChoice && Array.isArray(optionIdx)) {
      // Multiple choice: replace all votes for this user/poll
      await prisma.pollVote.deleteMany({ where: { pollId, userId: firebaseUid } });
      const votes = await Promise.all(optionIdx.map(idx =>
        prisma.pollVote.create({ data: { pollId, userId: firebaseUid, optionIdx: idx } })
      ));
      return NextResponse.json(votes);
    } else {
      // Single choice: delete all previous votes for this user/poll, then create new
      await prisma.pollVote.deleteMany({ where: { pollId, userId: firebaseUid } });
      const vote = await prisma.pollVote.create({ data: { pollId, userId: firebaseUid, optionIdx: typeof optionIdx === 'number' ? optionIdx : 0 } });
      return NextResponse.json(vote);
    }
  } catch (error: any) {
    console.error('POST /api/polls/[id]/vote error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 