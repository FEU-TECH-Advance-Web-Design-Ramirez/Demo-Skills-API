import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Update User (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, password } = await req.json();

    if (!name && !password) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.userUrbanExplorer.update({
      where: { id: params.id },
      data: updateData,
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ Delete User (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.userUrbanExplorer.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
