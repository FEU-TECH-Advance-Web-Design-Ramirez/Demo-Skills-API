import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Get User by ID (GET)
export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    const user = await prisma.userMusicLover.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
