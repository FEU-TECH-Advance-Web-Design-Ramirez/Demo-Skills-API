import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/../prisma/generated/postgresql";

const prisma = new PrismaClient();

// ✅ Update User Details (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updatedUser = await prisma.userFoodie.update({
      where: { id },
      data: { name },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ Ban (Delete) a User (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.userFoodie.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User banned successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error banning user:", error);
    return NextResponse.json({ error: "Failed to ban user" }, { status: 500 });
  }
}
