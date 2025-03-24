import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// Create a new user
export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const exists = await prisma.userFinanceManager.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const user = await prisma.userFinanceManager.create({
      data: { email, name, password },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// Get all users
export async function GET() {
  try {
    const users = await prisma.userFinanceManager.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
