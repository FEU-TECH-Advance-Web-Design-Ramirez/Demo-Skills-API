import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { status } = await req.json()

  if (!['confirmed', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const updated = await prisma.volunteerApplication.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json(updated)
}
