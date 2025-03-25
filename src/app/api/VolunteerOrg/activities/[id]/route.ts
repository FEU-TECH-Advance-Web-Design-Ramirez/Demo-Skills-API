import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const activity = await prisma.volunteerActivity.findUnique({ where: { id } })

    if (!activity) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 })
    }

    return NextResponse.json(activity)
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { title, description, location, date, organizerId } = await req.json()

    if (!organizerId)
      return NextResponse.json({ error: 'Organizer ID is required' }, { status: 400 })

    const owner = await prisma.volunteerActivity.findUnique({ where: { id, organizerId } })

    if (!owner) {
      return NextResponse.json({ error: 'You are not authorized to update this activity' }, { status: 403 })
    }

    const updated = await prisma.volunteerActivity.update({
      where: { id },
      data: {
        title,
        description,
        location,
        date: new Date(date),
      },
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
  try {
    const { id } = params

    const organizerId = req.headers.get('organizerId')

    if (!organizerId)
      return NextResponse.json({ error: 'Organizer ID is required' }, { status: 400 })

    const owner = await prisma.volunteerActivity.findUnique({ where: { id, organizerId } })

    if (!owner) {
      const admin = await prisma.userVolunteerOrg.findUnique({ where: { id: organizerId } })

      if (!admin || !admin.name.startsWith('a-'))
        return NextResponse.json({ error: 'You are not authorized to update this activity' }, { status: 403 })
    }

    await prisma.volunteerActivity.delete({ where: { id } })
    return NextResponse.json({ message: 'Activity deleted successfully' })
  } catch (err) {
    let errMessage = 'Internal server error'
    if (err instanceof Error) {
      errMessage = err.message
    }
    return NextResponse.json({ error: errMessage }, { status: 500 })
  }
}
