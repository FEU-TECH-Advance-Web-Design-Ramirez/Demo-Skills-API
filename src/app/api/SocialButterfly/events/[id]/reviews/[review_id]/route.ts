import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from '@/../prisma/generated/postgresql2'

const prisma = new PostgresqlClient()

// PUT - Update a review
export async function PUT(req: NextRequest, { params }: { params: { review_id: string } }) {
  try {
    const body = await req.json()
    const { rating, comment } = body

    if (rating == null || !comment) {
      return NextResponse.json({ error: 'Rating and comment are required' }, { status: 400 })
    }

    const updated = await prisma.reviewSocialButterfly.update({
      where: { id: params.review_id },
      data: {
        rating,
        comment,
        validated: false // mark for re-validation if edited
      }
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { review_id: string } }) {
  try {
    await prisma.reviewSocialButterfly.delete({
      where: { id: params.review_id }
    })

    return NextResponse.json({ message: 'Review deleted successfully' }, { status: 200 })
  } catch (err: any) {
    if (err.code === 'P2025') {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}