import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Submit New Concert (POST)
export async function POST(req: NextRequest) {
  try {
    const { title, date, venue, genre, submittedBy } = await req.json();

    if (!title || !date || !venue || !genre || !submittedBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const concert = await prisma.concertMusicLover.create({
      data: {
        title,
        date: new Date(date),
        venue,
        genre,
        submittedBy,
      },
    });

    return NextResponse.json(concert, { status: 201 });
  } catch (error) {
    console.error("Error submitting concert:", error);
    return NextResponse.json({ error: "Failed to create concert" }, { status: 500 });
  }
}

// ✅ Get All Concerts (GET)
export async function GET(req: NextRequest) {
  try {
    const concerts = await prisma.concertMusicLover.findMany({
      orderBy: { date: "asc" },
      select: {
        id: true,
        title: true,
        date: true,
        venue: true,
        genre: true,
        validated: true,
        createdAt: true,
        submittedBy: true,
      },
    });

    return NextResponse.json(concerts, { status: 200 });
  } catch (error) {
    console.error("Error fetching concerts:", error);
    return NextResponse.json({ error: "Failed to fetch concerts" }, { status: 500 });
  }
}
