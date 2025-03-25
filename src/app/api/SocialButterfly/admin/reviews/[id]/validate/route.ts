import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminId = req.headers.get('adminId')
    if (!adminId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = await prisma.userSocialButterfly.findUnique({
      where: { id: adminId }
    })

    if (!admin || !admin.name.startsWith("a-")) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updated = await prisma.reviewSocialButterfly.update({
      where: { id: params.id },
      data: { validated: true }
    })

    return NextResponse.json({
      message: 'Review validated successfully',
      review: updated
    }, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
