import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const player = await prisma.gameHubPlayer.findUnique({ where: { id: params.id } });
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, rank, mainGame } = await req.json();

    const updated = await prisma.gameHubPlayer.update({
      where: { id: params.id },
      data: { name, rank, mainGame },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.gameHubPlayer.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 });
  }
}
