import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/postgresql";

const prisma = new PrismaClient();

// ✅ Get Single User (GET by Email)
export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    const user = await prisma.userElderlyCareCompanion.findUnique({ where: { email: params.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}