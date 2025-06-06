import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Fetching announcements...');
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    console.log('Found announcements:', announcements);
    
    return NextResponse.json(announcements);
  } catch (error: any) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    const isAdmin = user?.email === 'admin@saves.org';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    console.log('Creating announcement with data:', data);
    
    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        author: user.name || 'Admin',
        userId: user.id
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    console.log('Created announcement:', announcement);
    return NextResponse.json(announcement);
  } catch (error: any) {
    console.error('POST /api/announcements error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 