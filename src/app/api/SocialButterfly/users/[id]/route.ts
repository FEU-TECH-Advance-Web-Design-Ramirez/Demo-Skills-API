import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

// PUT update user name
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const updatedUser = await prisma.userSocialButterfly.update({
      where: { id: params.id },
      data: { name }
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE user
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.userSocialButterfly.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
