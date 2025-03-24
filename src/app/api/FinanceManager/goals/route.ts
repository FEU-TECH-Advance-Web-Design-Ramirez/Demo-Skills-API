import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, title, targetAmount, deadline, description } = await req.json();

    if (!userId || !title || !targetAmount || !deadline || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const goal = await prisma.goalFinanceManager.create({
      data: {
        userId,
        title,
        targetAmount,
        deadline: new Date(deadline),
        description,
      },
    });

    return NextResponse.json(goal, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 });
  }
}
