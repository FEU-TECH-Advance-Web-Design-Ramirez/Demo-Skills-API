import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function GET(req: NextRequest, { params }: { params: { activityId: string } }) {
  const { activityId } = params

  const applications = await prisma.volunteerApplication.findMany({
    where: { activityId },
    include: {
      user: true,
    },
  })

  return NextResponse.json(applications)
}
