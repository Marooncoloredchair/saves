import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    
    // Test Firebase Admin
    const firebaseConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? 'Set' : 'Not Set'
    };

    return NextResponse.json({ 
      status: 'success',
      database: {
        connected: true,
        userCount
      },
      firebase: {
        config: firebaseConfig
      },
      env: {
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not Set',
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID ? 'Set' : 'Not Set',
        firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL ? 'Set' : 'Not Set',
        firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY ? 'Set' : 'Not Set'
      }
    });
  } catch (error: any) {
    console.error('Test failed:', error);
    return NextResponse.json({ 
      status: 'error',
      message: error.message,
      details: error.stack,
      env: {
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not Set',
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID ? 'Set' : 'Not Set',
        firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL ? 'Set' : 'Not Set',
        firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY ? 'Set' : 'Not Set'
      }
    }, { status: 500 });
  }
} 