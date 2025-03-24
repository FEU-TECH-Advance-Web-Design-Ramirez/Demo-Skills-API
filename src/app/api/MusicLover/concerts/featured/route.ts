import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Get Upcoming Featured Concerts
export async function GET(req: NextRequest) {
  try {
    const today = new Date();

    const featuredConcerts = await prisma.concertMusicLover.findMany({
      where: {
        validated: true,
        date: { gte: today },
      },
      orderBy: { date: "asc" },
      select: {
        id: true,
        title: true,
        date: true,
        venue: true,
        genre: true,
      },
    });

    return NextResponse.json(featuredConcerts, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured concerts:", error);
    return NextResponse.json({ error: "Failed to fetch featured concerts" }, { status: 500 });
  }
}
