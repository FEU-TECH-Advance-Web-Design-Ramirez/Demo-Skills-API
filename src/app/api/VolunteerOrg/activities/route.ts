import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function POST(req: NextRequest) {
  try {
    const { title, description, location, date, organizerId } = await req.json()

    if (!title || !description || !location || !date || !organizerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const activity = await prisma.volunteerActivity.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
        organizerId,
      },
    })

    return NextResponse.json(activity, { status: 201 })
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const activities = await prisma.volunteerActivity.findMany()
    return NextResponse.json(activities)
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}
