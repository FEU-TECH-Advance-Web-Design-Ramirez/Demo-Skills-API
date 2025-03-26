import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/postgresql";

const prisma = new PrismaClient();

// ✅ Update User (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name } = await req.json();
    const updatedUser = await prisma.userElderlyCareCompanion.update({
      where: { id: params.id },
      data: { name },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ Delete User (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.userElderlyCareCompanion.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
