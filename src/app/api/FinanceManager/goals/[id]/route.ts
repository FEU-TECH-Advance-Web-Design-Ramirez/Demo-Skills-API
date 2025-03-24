import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, targetAmount, deadline } = await req.json();

    if (!title || !targetAmount || !deadline) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedGoal = await prisma.goalFinanceManager.update({
      where: { id: params.id },
      data: {
        title,
        targetAmount,
        deadline: new Date(deadline),
      },
    });

    return NextResponse.json(updatedGoal, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update goal" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.goalFinanceManager.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Goal deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to delete goal" }, { status: 500 });
  }
}
