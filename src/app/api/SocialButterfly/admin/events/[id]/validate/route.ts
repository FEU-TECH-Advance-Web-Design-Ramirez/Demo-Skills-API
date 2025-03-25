import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updated = await prisma.eventSocialButterfly.update({
      where: { id: params.id },
      data: { validated: true }
    })

    return NextResponse.json({
      message: 'Event validated successfully',
      event: updated
    }, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
