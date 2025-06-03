import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminAuth } from '@/lib/firebaseAdmin'
import validator from 'validator'


export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(announcements)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const idToken = authHeader.split('Bearer ')[1]
    const decoded = await adminAuth.verifyIdToken(idToken)
    const firebaseUid = decoded.uid
    const email = decoded.email

    // Ensure admin user exists in DB
    let user = await prisma.user.findUnique({ where: { id: firebaseUid } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUid,
          name: email || 'Admin',
          email: email || `admin+${firebaseUid}@example.com`,
          password: '',
          role: 'ADMIN',
        },
      })
      console.log('Auto-provisioned admin user:', user.email)
    }

    if (user.role !== 'ADMIN' && email !== 'admin@saves.org') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const { title, content, author } = await req.json()
    if (!validator.isLength(title, { min: 1, max: 100 }) || !validator.isLength(content, { min: 1, max: 1000 })) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    const announcement = await prisma.announcement.create({ data: { title, content, author } })
    return NextResponse.json(announcement)
  } catch (error: any) {
    console.error('POST /api/announcements error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 