import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(req: Request) {
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

    return NextResponse.json({ role: user.role });
  } catch (error: any) {
    console.error('GET /api/auth/verify error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 