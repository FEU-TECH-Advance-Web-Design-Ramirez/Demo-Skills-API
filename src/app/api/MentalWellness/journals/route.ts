import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Create Journal Entry (POST)
export async function POST(req: NextRequest) {
  try {
    const { userId, mood, entryText, tags } = await req.json();

    if (!userId || !mood || !entryText) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const journal = await prisma.journalMentalWellness.create({
      data: {
        userId,
        mood,
        entryText,
        tags: tags || [],
      },
    });

    return NextResponse.json(journal, { status: 201 });
  } catch (error) {
    console.error("Error creating journal:", error);
    return NextResponse.json({ error: "Failed to create journal" }, { status: 500 });
  }
}
