import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function PUT(req: NextRequest, { params }: { params: { reviewId: string } }) {
  try {
    const { rating, comment } = await req.json();
    if (rating === undefined || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedReview = await prisma.reviewEduSeeker.update({
      where: { id: params.reviewId },
      data: { rating, comment },
    });

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { reviewId: string } }) {
  try {
    await prisma.reviewEduSeeker.delete({ where: { id: params.reviewId } });
    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
