import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Update Journal Entry (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { mood, entryText } = await req.json();

    if (!mood || !entryText) {
      return NextResponse.json({ error: "Mood and entryText are required" }, { status: 400 });
    }

    const updated = await prisma.journalMentalWellness.update({
      where: { id: params.id },
      data: { mood, entryText },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating journal:", error);
    return NextResponse.json({ error: "Failed to update journal" }, { status: 500 });
  }
}

// ✅ Delete Journal Entry (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.journalMentalWellness.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Journal entry deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting journal:", error);
    return NextResponse.json({ error: "Failed to delete journal" }, { status: 500 });
  }
}
