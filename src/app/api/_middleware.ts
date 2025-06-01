import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function middleware(req: NextRequest) {
  // Skip middleware for non-API routes
  if (!req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    // Attach user info to request (custom property)
    (req as any).user = decodedToken;
    return NextResponse.next();
  } catch (err) {
    console.error('Token verification error:', err);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
} 