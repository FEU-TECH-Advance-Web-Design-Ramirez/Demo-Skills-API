import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 })
    }

    const updated = await prisma.userVolunteerOrg.update({
      where: { id },
      data: { name },
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.userVolunteerOrg.delete({ where: { id } })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}
