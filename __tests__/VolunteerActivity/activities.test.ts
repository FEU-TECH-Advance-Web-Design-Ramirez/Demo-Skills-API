/**
 * @fileoverview Test suite for Volunteer Activities API endpoints.
 * 
 * @description
 * Tests all CRUD operations + ownership restrictions:
 * - Create activity (POST)
 * - Get all activities (GET)
 * - Get single activity (GET by ID)
 * - Update activity (PUT by owner only)
 * - Update activity (PUT by non-owner, should fail)
 * - Delete activity (DELETE by owner only)
 * - Delete activity (DELETE by non-owner, should fail)
 * - Delete activity (DELETE by admin)
 * 
 * @testSetup
 * - Cleans up any existing test users before running tests
 * - Creates a test user for subsequent operations
 * - Removes test data after completion
 *
 * @testData
 * - Uses a test organizer account (testUserId)
 * - Uses a second non-owner user (otherUserId) for permission denial
 * 
 * @dependencies
 * - Prisma Client for PostgreSQL database operations
 * - Next.js Request/Response utilities
 * - Jest testing framework
 */

import { POST as createUser } from "@/app/api/VolunteerOrg/users/route";
import { POST as createActivity, GET as getAllActivities } from "@/app/api/VolunteerOrg/activities/route";
import { GET as getActivityById, PUT as updateActivity, DELETE as deleteActivity } from "@/app/api/VolunteerOrg/activities/[id]/route";
import { NextRequest } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

let testUserId: string;
let otherUserId: string;
let adminUserId: string;
let testActivityId: string;
let testActivityIdAdmin: string;
const testEmail = "volunteerorg_activity_test@example.com";
const otherEmail = "nonowner@example.com";
const adminEmail = "admin@example.com";

describe("VolunteerOrg - Activities API Tests", () => {

  // =========================
  // ✅ Cleanup before running tests
  // =========================
  beforeAll(async () => {
    await prisma.volunteerApplication.deleteMany();
    await prisma.volunteerActivity.deleteMany();
    await prisma.userVolunteerOrg.deleteMany({ where: { email: { in: [testEmail, otherEmail, adminEmail] } } });

    // Create activity owner
    const ownerRes = await createUser(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: testEmail,
        name: "Activity Organizer",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const owner = await ownerRes.json();
    testUserId = owner.id;

    // Create another (non-owner) user
    const otherRes = await createUser(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: otherEmail,
        name: "Non Owner",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const other = await otherRes.json();
    otherUserId = other.id;

    // Create an admin user
    const adminRes = await createUser(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: adminEmail,
        name: "a-Admin User",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const adminUser = await adminRes.json();
    adminUserId = adminUser.id;
  });

  // =========================
  // ✅ Create Methods (C)
  // =========================
  it("should create a new volunteer activity", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "Park Clean-up",
        description: "Clean up the city park",
        location: "Central Park",
        date: new Date().toISOString(),
        organizerId: testUserId,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const reqAdmin = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "Park Clean-up - Going to be deleted by admin",
        description: "Clean up the city park",
        location: "Central Park",
        date: new Date().toISOString(),
        organizerId: testUserId,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await createActivity(req);
    const resAdmin = await createActivity(reqAdmin);
    const activityAdmin = await resAdmin.json();
    testActivityIdAdmin = activityAdmin.id;
    expect(res.status).toBe(201);
    const activity = await res.json();
    testActivityId = activity.id;

    expect(activity.organizerId).toBe(testUserId);
    expect(activity.title).toBe("Park Clean-up");
  });

  // =========================
  // ✅ Read Methods (R)
  // =========================
  it("should fetch all volunteer activities", async () => {
    const res = await getAllActivities();
    expect(res.status).toBe(200);
    const activities = await res.json();

    expect(Array.isArray(activities)).toBe(true);
    expect(activities.some((a: any) => a.id === testActivityId)).toBe(true);
  });

  it("should fetch activity by ID", async () => {
    const req = new NextRequest(`http://localhost`);
    const res = await getActivityById(req, { params: { id: testActivityId } });

    expect(res.status).toBe(200);
    const activity = await res.json();
    expect(activity.id).toBe(testActivityId);
  });

  // =========================
  // ✅ Update Methods (U)
  // =========================
  it("should update activity by owner", async () => {
    const req = new NextRequest(`http://localhost`, {
      method: "PUT",
      body: JSON.stringify({
        title: "Updated Park Clean-up",
        description: "Now includes tree planting",
        location: "Updated Park",
        date: new Date().toISOString(),
        organizerId: testUserId,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await updateActivity(req, { params: { id: testActivityId } });
    expect(res.status).toBe(200);
    const updated = await res.json();
    expect(updated.title).toBe("Updated Park Clean-up");
  });

  it("should prevent update by non-owner", async () => {
    const req = new NextRequest(`http://localhost`, {
      method: "PUT",
      body: JSON.stringify({
        title: "Hack Attempt",
        description: "Should not succeed",
        location: "Nowhere",
        date: new Date().toISOString(),
        organizerId: otherUserId,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await updateActivity(req, { params: { id: testActivityId } });
    expect(res.status).toBe(403); // Forbidden
  });

  // =========================
  // ✅ Delete Methods (D)
  // =========================
  it("should prevent delete by non-owner", async () => {
    const req = new NextRequest(`http://localhost`, { method: "DELETE", headers: new Headers({ organizerId: otherUserId }) });
    const res = await deleteActivity(req, { params: { id: testActivityId } });

    expect(res.status).toBe(403); // Forbidden
  });

  it("should delete by admin", async () => {
    const req = new NextRequest(`http://localhost`, {
      method: "DELETE",
      headers: new Headers({ organizerId: adminUserId }),
    });

    const res = await deleteActivity(req, { params: { id: testActivityIdAdmin } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe("Activity deleted successfully");
  });

  it("should delete activity by creator", async () => {
    // simulate request with correct user context (organizer)
    const req = new NextRequest(`http://localhost`, {
      method: "DELETE",
      headers: new Headers({ organizerId: testUserId }),
    });

    const res = await deleteActivity(req, { params: { id: testActivityId } });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe("Activity deleted successfully");
  });

  // =========================
  // ✅ Cleanup remaining test data after tests
  // =========================
  afterAll(async () => {
    await prisma.volunteerActivity.deleteMany();
    await prisma.userVolunteerOrg.deleteMany({ where: { email: { in: [testEmail, otherEmail] } } });
    await prisma.$disconnect();
  });

  // =========================
  // 📅 Date's:     
  // Created: 3/25/25       
  // Updated:
  // Status:         ✅ Complete
  // Remark:         CRUD + ownership protection for VolunteerOrg Activities API
  // =========================
});
