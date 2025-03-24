import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Admin: Validate Platform
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // check id if it exist in platform
  const validPlatform = await prisma.platformEduSeeker.findUnique({
    where: { id: params.id },
  });

  // check id if review exist
  const validReview = await prisma.reviewEduSeeker.findUnique({
    where: { id: params.id },
  });

  // check if not found in both
  if (!validPlatform && !validReview) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 404 });
  }

  // check if found in platform
  if (validPlatform) {
    return ValidatePlatform(req, { params });
  } else if (validReview) {
    return ValidateReview(req, { params });
  }
}

async function ValidatePlatform(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

async function ValidateReview(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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