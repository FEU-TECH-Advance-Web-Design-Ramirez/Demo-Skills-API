import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function GET(_: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const transactions = await prisma.transactionFinanceManager.findMany({
      where: { userId: params.userId },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(transactions, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
