import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

// Create a new event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, date, location, category, submittedBy } = body

    if (!title || !description || !date || !location || !category || !submittedBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const event = await prisma.eventSocialButterfly.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        category,
        submittedBy
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Get all events
export async function GET() {
  try {
    const events = await prisma.eventSocialButterfly.findMany({
      orderBy: { date: 'asc' },
      where: { validated: true }
    })

    return NextResponse.json(events, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
