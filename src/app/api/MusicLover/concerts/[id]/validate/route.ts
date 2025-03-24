import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Validate Concert (Admin Only)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const concert = await prisma.concertMusicLover.update({
      where: { id: params.id },
      data: { validated: true },
    });

    return NextResponse.json({ message: "Concert validated", concert }, { status: 200 });
  } catch (error) {
    console.error("Error validating concert:", error);
    return NextResponse.json({ error: "Failed to validate concert" }, { status: 500 });
  }
}
