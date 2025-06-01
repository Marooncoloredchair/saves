import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminAuth } from '@/lib/firebaseAdmin';
import validator from 'validator';

const prisma = new PrismaClient();

// You may need to install emailjs-com or use fetch for EmailJS REST API
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

export async function POST(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: firebaseUid }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { status } = await request.json();
    if (!status || !['ATTENDING', 'NOT_ATTENDING'].includes(status)) {
      return NextResponse.json({ error: 'Invalid RSVP status' }, { status: 400 });
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Create or update RSVP
    const rsvp = await prisma.rSVP.upsert({
      where: {
        userId_eventId: {
          userId: firebaseUid,
          eventId: id,
        },
      },
      update: {
        status,
      },
      create: {
        userId: firebaseUid,
        eventId: id,
        status,
      },
    });

    // Send reminder email via EmailJS
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      const emailPayload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: user.email,
          to_name: user.name || user.email || 'User',
          event_id: id,
        },
      };
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload),
      });
    }

    return NextResponse.json(rsvp);
  } catch (error: any) {
    console.error('RSVP error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 