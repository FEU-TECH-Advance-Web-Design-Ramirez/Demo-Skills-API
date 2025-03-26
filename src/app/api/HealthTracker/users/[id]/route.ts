import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as HealthTrackerClient } from "@/../prisma/generated/postgresql2";

const prisma = new HealthTrackerClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required to update" }, { status: 400 });
    }

    const updatedUser = await prisma.userHealthTracker.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.userHealthTracker.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
