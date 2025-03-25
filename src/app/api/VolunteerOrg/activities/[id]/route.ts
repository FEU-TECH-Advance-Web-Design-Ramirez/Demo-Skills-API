import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const activity = await prisma.volunteerActivity.findUnique({ where: { id } })

  if (!activity) {
    return NextResponse.json({ error: 'Activity not found' }, { status: 404 })
  }

  return NextResponse.json(activity)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { title, description, location, date } = await req.json()

  const updated = await prisma.volunteerActivity.update({
    where: { id },
    data: {
      title,
      description,
      location,
      date: new Date(date),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  // Optional: Verify if requester is admin before deletion

  try {
    await prisma.volunteerActivity.delete({ where: { id } })
    return NextResponse.json({ message: 'Activity deleted successfully' })
  } catch {
    return NextResponse.json({ error: 'Activity not found or cannot delete' }, { status: 404 })
  }
}
