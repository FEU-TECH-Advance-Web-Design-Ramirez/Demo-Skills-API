import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Submit Assessment (POST)
export async function POST(req: NextRequest) {
  try {
    const { userId, responses } = await req.json();

    if (!userId || !responses) {
      return NextResponse.json({ error: "Missing userId or responses" }, { status: 400 });
    }

    // Simulate scoring logic (placeholder — replace with real logic)
    const result = "Balanced Thinker";

    const assessment = await prisma.assessmentMentalWellness.create({
      data: {
        userId,
        responses,
        result,
      },
    });

    return NextResponse.json(assessment, { status: 201 });
  } catch (error) {
    console.error("Error creating assessment:", error);
    return NextResponse.json({ error: "Failed to create assessment" }, { status: 500 });
  }
}
