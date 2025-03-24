import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Get User by ID (GET)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.userMusicLover.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// ✅ Update User by ID (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updatedUser = await prisma.userMusicLover.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ Delete (deactivate) User by ID (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.userMusicLover.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
