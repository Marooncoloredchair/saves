import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const carpools = await prisma.carpool.findMany({
      include: { passengers: true, driver: true },
    })
    return NextResponse.json(carpools)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
} 