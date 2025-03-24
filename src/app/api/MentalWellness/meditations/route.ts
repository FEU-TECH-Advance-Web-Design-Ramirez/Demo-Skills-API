import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Get All Guided Meditations (GET)
export async function GET() {
  try {
    const meditations = await prisma.meditation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(meditations, { status: 200 });
  } catch (error) {
    console.error("Error fetching meditations:", error);
    return NextResponse.json({ error: "Failed to fetch meditations" }, { status: 500 });
  }
}
