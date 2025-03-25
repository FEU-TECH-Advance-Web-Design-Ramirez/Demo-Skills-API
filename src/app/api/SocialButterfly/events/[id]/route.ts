import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

// GET event by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.eventSocialButterfly.findUnique({
      where: { id: params.id }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(event, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PUT update event
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { title, description, date, location } = body

    if (!title || !description || !date || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const updated = await prisma.eventSocialButterfly.update({
      where: { id: params.id },
      data: {
        title,
        description,
        date: new Date(date),
        location
      }
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE event (admin only – assume caller is authorized)
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.eventSocialButterfly.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Event deleted' }, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
