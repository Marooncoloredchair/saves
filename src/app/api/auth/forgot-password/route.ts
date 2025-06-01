import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL

async function sendResetEmail(to: string, resetUrl: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to,
      subject: 'Reset your password',
      html: `<p>Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
    })
  })
  if (!res.ok) throw new Error('Failed to send email')
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ success: true }) // Don't reveal if user exists
    // Generate token
    const token = crypto.randomBytes(32).toString('hex')
    // Store token and expiry (1 hour) in user record
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token as any,
        resetTokenExpiry: new Date(Date.now() + 3600 * 1000) as any,
      } as any,
    })
    // Send real email
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`
    await sendResetEmail(email, resetUrl)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 