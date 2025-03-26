import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/postgresql2";

const prisma = new PrismaClient();

// ✅ Update User (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name } = await req.json();

    // Check if the user exists
    const existingUser = await prisma.eventOrganizerUser.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.eventOrganizerUser.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ Delete (Ban) User (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Check if the user exists
    const existingUser = await prisma.eventOrganizerUser.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.eventOrganizerUser.delete({ where: { id } });

    return NextResponse.json({ message: "User successfully deleted" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
