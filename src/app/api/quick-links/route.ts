import { NextResponse } from 'next/server'
import validator from 'validator'

let quickLinks = [
  { id: '1', label: 'URI Home', url: 'https://www.uri.edu/' },
  { id: '2', label: 'Volunteer Center', url: 'https://web.uri.edu/volunteer/' },
  { id: '3', label: 'Rhody S.A.V.E.S.', url: 'https://web.uri.edu/saves/' },
  { id: '4', label: 'Contact SAVES', url: 'mailto:saves@etal.uri.edu' },
]

export async function GET() {
  return NextResponse.json(quickLinks)
}

export async function POST(req: Request) {
  const { label, url } = await req.json()
  const id = Date.now().toString()
  quickLinks.push({ id, label, url })
  return NextResponse.json(quickLinks)
}

export async function PUT(req: Request) {
  const { id, label, url } = await req.json()
  quickLinks = quickLinks.map(l => l.id === id ? { id, label, url } : l)
  return NextResponse.json(quickLinks)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  quickLinks = quickLinks.filter(l => l.id !== id)
  return NextResponse.json(quickLinks)
} 