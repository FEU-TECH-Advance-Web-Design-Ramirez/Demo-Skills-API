import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, amount, source, date, description } = await req.json();

    if (!userId || !amount || !source || !date || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transaction = await prisma.transactionFinanceManager.create({
      data: {
        userId,
        amount,
        source,
        date: new Date(date),
        description,
        type: "income",
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create income transaction" }, { status: 500 });
  }
}
