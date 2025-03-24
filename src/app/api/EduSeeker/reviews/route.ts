import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Create or Get Reviews for Platform
export async function POST(req: NextRequest) {
  try {
    const { platformId, userId, rating, comment } = await req.json();
    if (!platformId || !userId || rating === undefined || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const review = await prisma.reviewEduSeeker.create({
      data: { platformId, userId, rating, comment },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}