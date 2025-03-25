import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as HealthTrackerClient } from "@/../prisma/generated/postgresql2";

const prisma = new HealthTrackerClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const records = await prisma.recordHealthTracker.findMany({
      where: { userId: params.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 });
  }
}
