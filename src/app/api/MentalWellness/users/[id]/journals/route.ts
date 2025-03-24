import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Get Journal Entries by User
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const journals = await prisma.journalMentalWellness.findMany({
      where: { userId: params.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(journals, { status: 200 });
  } catch (error) {
    console.error("Error fetching journals:", error);
    return NextResponse.json({ error: "Failed to fetch journal entries" }, { status: 500 });
  }
}
