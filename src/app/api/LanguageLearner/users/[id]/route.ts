import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Update User (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, role } = await req.json();

    const updatedUser = await prisma.languageLearnerUser.update({
      where: { id: params.id },
      data: { name, role },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    let errorMessage = "Failed to update user";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ✅ Delete (Self-initiated) User (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.languageLearnerUser.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Your account has been deleted successfully." }, { status: 200 });
  } catch (error) {
    let errorMessage = "Failed to delete user";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
