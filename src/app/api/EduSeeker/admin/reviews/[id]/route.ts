import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Admin: Delete Review
export async function ADMIN_REVIEW_DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.reviewEduSeeker.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Review deleted by admin successfully" }, { status: 200 });
  } catch (error) {
    console.error("Admin error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review by admin" }, { status: 500 });
  }
}
