import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as HealthTrackerClient } from "@/../prisma/generated/postgresql2";

const prisma = new HealthTrackerClient();

export async function GET(_: NextRequest, { params }: { params: { email: string } }) {
  try {
    const user = await prisma.userHealthTracker.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}