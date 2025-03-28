import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

// ✅ Fetch a Single Platform (GET)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const platform = await prisma.languageLearnerPlatform.findUnique({
      where: { id: params.id },
    });

    if (!platform) {
      return NextResponse.json({ error: "Platform not found" }, { status: 404 });
    }

    return NextResponse.json(platform, { status: 200 });
  } catch (error) {
    console.error("Error fetching platform:", error);
    return NextResponse.json({ error: "Failed to fetch platform" }, { status: 500 });
  }
}

// ✅ Update a Platform (PUT) - Only Owner Can Edit
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, website, languagesOffered, description, ownerId } = await req.json();

    // Check if platform exists
    const platform = await prisma.languageLearnerPlatform.findUnique({
      where: { id: params.id },
    });

    if (!platform) {
      return NextResponse.json({ error: "Platform not found" }, { status: 404 });
    }

    if (platform.ownerId !== ownerId) {
      return NextResponse.json({ error: "Unauthorized! Only the owner can edit." }, { status: 403 });
    }

    const updatedPlatform = await prisma.languageLearnerPlatform.update({
      where: { id: params.id },
      data: { name, website, languagesOffered, description },
    });

    return NextResponse.json(updatedPlatform, { status: 200 });
  } catch (error) {
    console.error("Error updating platform:", error);
    return NextResponse.json({ error: "Failed to update platform" }, { status: 500 });
  }
}

// ✅ Delete a Platform (DELETE) - Only Owner Can Delete
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { ownerId } = await req.json();

    // Check if platform exists
    const platform = await prisma.languageLearnerPlatform.findUnique({
      where: { id: params.id },
    });

    if (!platform) {
      return NextResponse.json({ error: "Platform not found" }, { status: 404 });
    }

    if (platform.ownerId !== ownerId) {
      return NextResponse.json({ error: "Unauthorized! Only the owner can delete." }, { status: 403 });
    }

    await prisma.languageLearnerPlatform.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Platform deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting platform:", error);
    return NextResponse.json({ error: "Failed to delete platform" }, { status: 500 });
  }
}
