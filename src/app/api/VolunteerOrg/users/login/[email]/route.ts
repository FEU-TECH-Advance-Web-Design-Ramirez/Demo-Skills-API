import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  try {

    const { email } = params
    const user = await prisma.userVolunteerOrg.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)

  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}