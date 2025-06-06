import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('Auth log:', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth log error:', error);
    return NextResponse.json({ error: 'Failed to log' }, { status: 500 });
  }
} 