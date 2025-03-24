import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Get Concert by ID (GET)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const concert = await prisma.concertMusicLover.findUnique({
      where: { id: params.id },
    });

    if (!concert) {
      return NextResponse.json({ error: "Concert not found" }, { status: 404 });
    }

    return NextResponse.json(concert, { status: 200 });
  } catch (error) {
    console.error("Error fetching concert:", error);
    return NextResponse.json({ error: "Failed to fetch concert" }, { status: 500 });
  }
}

// ✅ Update Concert Info (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, date, venue } = await req.json();

    if (!title || !date || !venue) {
      return NextResponse.json({ error: "Missing fields for update" }, { status: 400 });
    }

    const updated = await prisma.concertMusicLover.update({
      where: { id: params.id },
      data: {
        title,
        date: new Date(date),
        venue,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating concert:", error);
    return NextResponse.json({ error: "Failed to update concert" }, { status: 500 });
  }
}

// ✅ Delete Concert (Admin only) (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.concertMusicLover.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Concert deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting concert:", error);
    return NextResponse.json({ error: "Failed to delete concert" }, { status: 500 });
  }
}
