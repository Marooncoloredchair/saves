import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error('Missing Firebase Admin environment variables');
}

let adminAuth: Auth;

try {
  // Properly format the private key
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY
        .replace(/\\n/g, '\n')
        .replace(/^"|"$/g, '') // Remove surrounding quotes if present
    : '';

  if (!privateKey) {
    throw new Error('Invalid Firebase private key format');
  }

  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  };

  // Initialize Firebase Admin if not already initialized
  if (!getApps().length) {
    initializeApp(firebaseAdminConfig);
  }
  
  adminAuth = getAuth();
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
  throw new Error('Failed to initialize Firebase Admin: ' + (error as Error).message);
}

export { adminAuth }; 