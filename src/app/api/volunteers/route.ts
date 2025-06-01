import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const volunteers = await prisma.user.findMany({
      where: { role: 'MEMBER' },
      select: { id: true, name: true, role: true },
    })
    return NextResponse.json(volunteers)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 