import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function POST(req: NextRequest) {
  try {
    const { name, userId, rank, mainGame } = await req.json();

    if (!name || !userId || !rank || !mainGame) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const player = await prisma.gameHubPlayer.create({
      data: { name, userId, rank, mainGame },
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const players = await prisma.gameHubPlayer.findMany();
    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 });
  }
}
