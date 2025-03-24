import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, amount, category, date, description } = await req.json();

    if (!userId || !amount || !category || !date || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transaction = await prisma.transactionFinanceManager.create({
      data: {
        userId,
        amount,
        category,
        date: new Date(date),
        description,
        type: "expense",
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create expense transaction" }, { status: 500 });
  }
}
