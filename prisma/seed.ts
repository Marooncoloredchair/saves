import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  // Create users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saves.org' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@saves.org',
      password: await bcrypt.hash('adminpw', 10),
      role: 'ADMIN',
    },
  })
  const member = await prisma.user.upsert({
    where: { email: 'member@saves.org' },
    update: {},
    create: {
      name: 'Member User',
      email: 'member@saves.org',
      password: await bcrypt.hash('memberpw', 10),
      role: 'MEMBER',
    },
  })

  // Create events (add 'time' field)
  const event1 = await prisma.event.create({
    data: {
      title: 'Biweekly Meeting',
      description: 'Our regular biweekly meeting.',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      time: '18:00',
      organizerId: admin.id,
    },
  })
  const event2 = await prisma.event.create({
    data: {
      title: 'Weekend Volunteering',
      description: 'Join us for a weekend volunteering event!',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      time: '09:00',
      organizerId: admin.id,
    },
  })

  // Create carpools
  await prisma.carpool.create({
    data: {
      maxPassengers: 4,
      driverId: member.id,
      passengers: { connect: [{ id: member.id }] },
    },
  })

  // Create RSVPs
  await prisma.rSVP.create({
    data: {
      status: 'GOING',
      userId: member.id,
      eventId: event1.id,
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  }) 