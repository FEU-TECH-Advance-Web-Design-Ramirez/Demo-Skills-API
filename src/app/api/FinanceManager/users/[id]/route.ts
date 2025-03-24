import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.userFinanceManager.findUnique({ where: { id: params.id } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

    const user = await prisma.userFinanceManager.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.userFinanceManager.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
