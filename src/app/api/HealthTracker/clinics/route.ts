import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as HealthTrackerClient } from "@/../prisma/generated/postgresql2";

const prisma = new HealthTrackerClient();

export async function POST(req: NextRequest) {
  try {
    const { name, location, availableSlots, contact } = await req.json();

    if (!name || !location || !availableSlots || !contact) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const clinic = await prisma.clinicHealthTracker.create({
      data: {
        name,
        location,
        availableSlots,
        contact,
      },
    });

    return NextResponse.json(clinic, { status: 201 });
  } catch (error) {
    console.error("Error creating clinic:", error);
    return NextResponse.json({ error: "Failed to create clinic" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const clinics = await prisma.clinicHealthTracker.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clinics);
  } catch (error) {
    console.error("Error fetching clinics:", error);
    return NextResponse.json({ error: "Failed to fetch clinics" }, { status: 500 });
  }
}
