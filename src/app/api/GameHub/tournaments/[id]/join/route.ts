import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { playerId } = await req.json();

    if (!playerId) {
      return NextResponse.json({ error: "Missing playerId" }, { status: 400 });
    }

    const participation = await prisma.gameHubTournamentPlayer.create({
      data: {
        tournamentId: params.id,
        playerId,
      },
    });

    return NextResponse.json(participation, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return NextResponse.json({ error: "Player already joined" }, { status: 409 });
    }

    console.error("Error joining tournament:", error);
    return NextResponse.json({ error: "Failed to join tournament" }, { status: 500 });
  }
}
