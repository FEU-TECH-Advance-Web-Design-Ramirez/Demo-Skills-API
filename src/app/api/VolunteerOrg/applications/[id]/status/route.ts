import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { status } = await req.json()

    if (!['confirmed', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const application = await prisma.volunteerApplication.findUnique({
      where: { id },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const updated = await prisma.volunteerApplication.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updated)
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}
