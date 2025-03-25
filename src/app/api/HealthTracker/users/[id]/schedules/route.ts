import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as HealthTrackerClient } from "@/../prisma/generated/postgresql2";

const prisma = new HealthTrackerClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const schedules = await prisma.scheduleHealthTracker.findMany({
      where: { userId: params.id },
      orderBy: { dateTime: "asc" },
    });

    return NextResponse.json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json({ error: "Failed to fetch schedules" }, { status: 500 });
  }
}
