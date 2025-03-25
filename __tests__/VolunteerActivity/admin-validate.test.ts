/**
 * @fileoverview Test suite for Admin Activity Validation API.
 *
 * @description
 * Tests include:
 * - Admin successfully validates an activity
 * - Non-admin is forbidden from validation
 * - Invalid activity ID returns not found
 *
 * @testSetup
 * - Clears related tables before run
 * - Creates 1 admin user, 1 regular user, 1 activity
 *
 * @testData
 * - `adminId`: email starts with "a-" (granted access)
 * - `nonAdminId`: regular user
 * - `activityId`: activity to be validated
 *
 * @dependencies
 * - Prisma Client
 * - Next.js route handlers
 * - Jest framework
 */

import { POST as createUser } from "@/app/api/VolunteerOrg/users/route";
import { POST as createActivity } from "@/app/api/VolunteerOrg/activities/route";
import { POST as validateActivity } from "@/app/api/VolunteerOrg/admin/activities/[id]/validate/route";
import { NextRequest } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

let adminId: string;
let nonAdminId: string;
let activityId: string;

const adminEmail = "a-admin@example.com";
const userEmail = "regularuser@example.com";

describe("VolunteerOrg - Admin Activity Validation API Tests", () => {
  // =========================
  // ✅ Cleanup before running tests
  // =========================
  beforeAll(async () => {
    await prisma.volunteerApplication.deleteMany();
    await prisma.volunteerActivity.deleteMany();
    await prisma.userVolunteerOrg.deleteMany({
      where: {
        email: { in: [adminEmail, userEmail] },
      },
    });

    // Create Admin User
    const adminRes = await createUser(
      new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify({
          email: adminEmail,
          name: "a-Admin User",
          password: "admin123",
        }),
        headers: new Headers({ "Content-Type": "application/json" }),
      })
    );
    const admin = await adminRes.json();
    adminId = admin.id;

    // Create Non-Admin User
    const userRes = await createUser(
      new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          name: "Regular User",
          password: "user123",
        }),
        headers: new Headers({ "Content-Type": "application/json" }),
      })
    );
    const user = await userRes.json();
    nonAdminId = user.id;

    // Create Activity
    const activityRes = await createActivity(
      new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify({
          title: "Event that Needs Validation",
          description: "An event posted by a regular user",
          location: "Testville",
          date: new Date().toISOString(),
          organizerId: user.id,
        }),
        headers: new Headers({ "Content-Type": "application/json" }),
      })
    );
    const activity = await activityRes.json();
    activityId = activity.id;
  });

  // =========================
  // ✅ POST /validate by Admin
  // =========================
  it("should allow admin to validate an activity", async () => {
    const res = await validateActivity(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ adminId }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }), { params: { id: activityId } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe("Activity validated");
    expect(body.activity.validated).toBe(true);
  });

  // =========================
  // ❌ POST /validate by Non-Admin
  // =========================
  it("should forbid validation by non-admin", async () => {
    const res = await validateActivity(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ adminId: nonAdminId }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }), { params: { id: activityId } });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("Admin not found");
  });

  // =========================
  // ❌ POST /validate with Invalid Activity ID
  // =========================
  it("should return 404 for non-existent activity", async () => {
    const res = await validateActivity(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ adminId }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }), { params: { id: "invalid-id-123" } });

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("Activity not found");
  });

  // =========================
  // ✅ Cleanup
  // =========================
  afterAll(async () => {
    await prisma.volunteerActivity.deleteMany();
    await prisma.userVolunteerOrg.deleteMany({
      where: { email: { in: [adminEmail, userEmail] } },
    });
    await prisma.$disconnect();
  });

  // =========================
  // 📅 Date's:     
  // Created: 3/25/25       
  // Updated:
  // Status:         ✅ Complete
  // Remark:         Tests admin-only access to activity validation endpoint
  // =========================
});
