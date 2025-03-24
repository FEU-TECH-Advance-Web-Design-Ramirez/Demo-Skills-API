import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as GameHubClient } from "@/../prisma/generated/postgresql2";

const prisma = new GameHubClient();

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.gameHubUser.update({
      where: { id: params.id },
      data: { validated: true },
    });

    return NextResponse.json({ validated: user.validated });
  } catch (error) {
    console.error("Error validating user:", error);
    return NextResponse.json({ error: "Failed to validate user" }, { status: 500 });
  }
}
