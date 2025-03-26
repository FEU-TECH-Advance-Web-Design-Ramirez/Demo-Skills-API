import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Update User (PUT /{id})
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name } = await req.json();

    if (!params.id || !name) {
      return NextResponse.json({ error: "User ID and name are required" }, { status: 400 });
    }

    const updatedUser = await prisma.userPetLover.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ Delete User (DELETE /{id})
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {

    if (!params.id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await prisma.userPetLover.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
