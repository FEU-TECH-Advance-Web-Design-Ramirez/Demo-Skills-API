import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const user = await prisma.userVolunteerOrg.findUnique({ where: { id } })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.userVolunteerOrg.delete({ where: { id } })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch {
    return NextResponse.json({ error: 'User not found or could not be deleted' }, { status: 404 })
  }
}
