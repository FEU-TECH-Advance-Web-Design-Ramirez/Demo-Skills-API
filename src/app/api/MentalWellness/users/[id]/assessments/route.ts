import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Get Assessment for User
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const assessments = await prisma.assessmentMentalWellness.findMany({
      where: { userId: params.userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(assessments, { status: 200 });
  } catch (error) {
    console.error("Error fetching assessment:", error);
    return NextResponse.json({ error: "Failed to fetch assessments" }, { status: 500 });
  }
}
