import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Submit Meditation Feedback (POST)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, rating, comment } = await req.json();

    if (!userId || !rating) {
      return NextResponse.json({ error: "Missing userId or rating" }, { status: 400 });
    }

    const feedback = await prisma.meditationFeedback.create({
      data: {
        userId,
        meditationId: params.id,
        rating,
        comment: comment || "",
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}
