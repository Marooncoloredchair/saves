import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';
import validator from 'validator';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const members = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
    return NextResponse.json(members);
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
    const data = await req.json();
    if (!validator.isLength(data.name || '', { min: 1, max: 100 }) || !validator.isEmail(data.email || '')) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const userData = { ...data };
    if (data.uid) userData.id = data.uid;
    const member = await prisma.user.create({ data: userData });
    return NextResponse.json(member);
  } catch (error: any) {
    console.error('POST /api/members error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 