import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as HealthTrackerClient } from "@/../prisma/generated/postgresql2";

const prisma = new HealthTrackerClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, type, title, dateTime, notes } = await req.json();

    if (!userId || !type || !title || !dateTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const schedule = await prisma.scheduleHealthTracker.create({
      data: {
        userId,
        type,
        title,
        dateTime: new Date(dateTime),
        notes,
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
  }
}
