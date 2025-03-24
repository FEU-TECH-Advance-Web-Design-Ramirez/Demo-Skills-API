import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Admin: Validate Platform
export async function VALIDATE_PLATFORM(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const validatedPlatform = await prisma.platformEduSeeker.update({
      where: { id: params.id },
      data: { validated: true },
    });

    return NextResponse.json(validatedPlatform, { status: 200 });
  } catch (error) {
    console.error("Error validating platform:", error);
    return NextResponse.json({ error: "Failed to validate platform" }, { status: 500 });
  }
}

// ✅ Admin: Validate Review
export async function VALIDATE_REVIEW(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const validatedReview = await prisma.reviewEduSeeker.update({
      where: { id: params.id },
      data: { validated: true },
    });

    return NextResponse.json(validatedReview, { status: 200 });
  } catch (error) {
    console.error("Error validating review:", error);
    return NextResponse.json({ error: "Failed to validate review" }, { status: 500 });
  }
}