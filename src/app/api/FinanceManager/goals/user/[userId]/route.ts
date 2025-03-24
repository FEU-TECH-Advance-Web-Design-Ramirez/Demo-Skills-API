import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function GET(_: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const goals = await prisma.goalFinanceManager.findMany({
      where: { userId: params.userId },
      orderBy: { deadline: "asc" },
    });

    return NextResponse.json(goals, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 });
  }
}
