import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { playerId } = await req.json();

    if (!playerId) {
      return NextResponse.json({ error: "Missing playerId" }, { status: 400 });
    }

    await prisma.gameHubTournamentPlayer.delete({
      where: {
        tournamentId_playerId: {
          tournamentId: params.id,
          playerId,
        },
      },
    });

    return NextResponse.json({ message: "Player removed from tournament" });
  } catch (error) {
    console.error("Error removing player from tournament:", error);
    return NextResponse.json({ error: "Failed to leave tournament" }, { status: 500 });
  }
}
