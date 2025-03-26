import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

// GET user by ID
export async function GET(_: NextRequest, { params }: { params: { email: string } }) {
  try {
    const user = await prisma.userSocialButterfly.findUnique({
      where: { email: params.email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}