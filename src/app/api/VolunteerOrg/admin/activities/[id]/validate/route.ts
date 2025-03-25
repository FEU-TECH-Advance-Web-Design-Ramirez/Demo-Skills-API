import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  // Placeholder: Check admin permissions here
  // Example: const isAdmin = checkUserRoleFromToken(req.headers); if (!isAdmin) return 403

  try {
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
