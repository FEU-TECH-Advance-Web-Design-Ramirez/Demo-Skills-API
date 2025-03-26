import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Get Single User (GET)
export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    const user = await prisma.languageLearnerUser.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    let errorMessage = "Failed to fetch user";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}