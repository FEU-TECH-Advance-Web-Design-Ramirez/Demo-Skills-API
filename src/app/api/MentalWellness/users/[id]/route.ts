import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Update User Name (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updatedUser = await prisma.userMentalWellness.update({
      where: { id: params.id },
      data: { name },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ Deactivate User (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.userMentalWellness.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
