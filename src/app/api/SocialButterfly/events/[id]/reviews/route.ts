// app/api/SocialButterfly/events/[event_id]/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const reviews = await prisma.reviewSocialButterfly.findMany({
      where: { eventId: params.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    })

    return NextResponse.json(reviews, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
