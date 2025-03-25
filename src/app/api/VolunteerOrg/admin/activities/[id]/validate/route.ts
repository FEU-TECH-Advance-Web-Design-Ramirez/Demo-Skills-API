import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const { adminId } = await req.json()

    const admin = await prisma.userVolunteerOrg.findUnique({ where: { id: adminId } })

    if (!admin || !admin.name.startsWith('a-'))
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 })

    const activity = await prisma.volunteerActivity.findUnique({ where: { id } })

    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 })

    const updated = await prisma.volunteerActivity.update({
      where: { id },
      data: { validated: true },
    })

    return NextResponse.json({ message: 'Activity validated', activity: updated })
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}
