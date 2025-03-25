import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

// POST - Submit a new review
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { event_id, userId, rating, comment } = body

    if (!event_id || !userId || rating == null || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const review = await prisma.reviewSocialButterfly.create({
      data: {
        eventId: event_id,
        userId,
        rating,
        comment
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
