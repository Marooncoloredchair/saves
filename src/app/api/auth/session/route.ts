import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    return NextResponse.json({
      user: {
        id: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      },
      expires: decodedToken.exp * 1000, // Convert to milliseconds
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }
} 