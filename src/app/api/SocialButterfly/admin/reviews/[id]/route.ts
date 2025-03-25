import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

// DELETE review (admin only)
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.reviewSocialButterfly.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Review deleted successfully' }, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
