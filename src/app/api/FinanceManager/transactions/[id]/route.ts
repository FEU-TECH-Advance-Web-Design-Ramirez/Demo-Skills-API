import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { amount, category, source, date, description } = await req.json();

    const transaction = await prisma.transactionFinanceManager.update({
      where: { id: params.id },
      data: {
        amount,
        category,
        source,
        date: new Date(date),
        description,
      },
    });

    return NextResponse.json(transaction, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.transactionFinanceManager.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}
