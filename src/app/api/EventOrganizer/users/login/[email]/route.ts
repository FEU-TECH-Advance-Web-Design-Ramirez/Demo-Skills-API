import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/postgresql2";

const prisma = new PrismaClient();

// ✅ Get User by Email (GET)
export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    const { email } = params;

    const user = await prisma.eventOrganizerUser.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}