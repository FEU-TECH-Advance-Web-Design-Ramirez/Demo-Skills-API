import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql";

const prisma = new PostgresqlClient();

// ✅ Register a New Hospital or Clinic (POST)
export async function POST(req: NextRequest) {
  try {
    const { name, location, contactInfo, type } = await req.json();

    if (!name || !location || !contactInfo || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const hospital = await prisma.hospitalMentalWellness.create({
      data: { name, location, contactInfo, type },
    });

    return NextResponse.json(hospital, { status: 201 });
  } catch (error) {
    console.error("Error registering hospital:", error);
    return NextResponse.json({ error: "Failed to register hospital" }, { status: 500 });
  }
}

// ✅ Get All Registered Facilities (GET)
export async function GET(req: NextRequest) {
  try {
    const hospitals = await prisma.hospitalMentalWellness.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(hospitals, { status: 200 });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
  }
}
