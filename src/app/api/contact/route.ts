import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import validator from 'validator'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    if (!validator.isEmail(email) || !validator.isLength(message, { min: 1, max: 1000 })) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    await prisma.contactMessage.create({
      data: { name, email, message },
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('POST /api/contact error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 