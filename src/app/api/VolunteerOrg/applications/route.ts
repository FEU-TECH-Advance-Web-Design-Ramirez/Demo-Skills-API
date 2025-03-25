import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function POST(req: NextRequest) {
  try {
    const { userId, activityId, motivation } = await req.json()

    if (!userId || !activityId || !motivation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const application = await prisma.volunteerApplication.create({
      data: { userId, activityId, motivation },
    })

    return NextResponse.json(application, { status: 201 })
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}
