import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function POST(req: NextRequest) {
  try {
    const { title, game, date, organizerId, rules } = await req.json();

    if (!title || !game || !date || !organizerId || !rules) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const tournament = await prisma.gameHubTournament.create({
      data: {
        title,
        game,
        date: new Date(date),
        organizerId,
        rules,
      },
    });

    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json({ error: "Failed to create tournament" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tournaments = await prisma.gameHubTournament.findMany();
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return NextResponse.json({ error: "Failed to fetch tournaments" }, { status: 500 });
  }
}
