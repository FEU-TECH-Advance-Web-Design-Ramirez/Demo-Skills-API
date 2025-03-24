import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const player = await prisma.gameHubPlayer.update({
      where: { id: params.id },
      data: { validated: true },
    });

    return NextResponse.json({ validated: player.validated });
  } catch (error) {
    console.error("Error validating player:", error);
    return NextResponse.json({ error: "Failed to validate player" }, { status: 500 });
  }
}
