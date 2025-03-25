import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const applications = await prisma.volunteerApplication.findMany({
    where: { activityId: id },
    include: {
      user: true,
    },
  })

  return NextResponse.json(applications)
}
