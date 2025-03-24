import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tournament = await prisma.gameHubTournament.findUnique({ where: { id: params.id } });
    if (!tournament) {
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }

    return NextResponse.json(tournament);
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return NextResponse.json({ error: "Failed to fetch tournament" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, game, date, rules } = await req.json();

    const updated = await prisma.gameHubTournament.update({
      where: { id: params.id },
      data: { title, game, date: new Date(date), rules },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating tournament:", error);
    return NextResponse.json({ error: "Failed to update tournament" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.gameHubTournament.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Tournament deleted successfully" });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json({ error: "Failed to delete tournament" }, { status: 500 });
  }
}
