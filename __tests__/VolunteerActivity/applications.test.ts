/**
 * @fileoverview Test suite for Volunteer Applications API endpoints.
 *
 * @description
 * Tests include:
 * - Apply to volunteer (POST, non-validated activity)
 * - Apply to volunteer (POST, validated activity)
 * - Get application list for an activity (GET)
 * - Confirm application (PUT by organizer)
 * - Reject application (PUT by organizer)
 * - Invalid status update (PUT)
 *
 * @testSetup
 * - Cleans all users, activities, and applications before run
 * - Creates an activity and two users (organizer & applicant)
 * - Removes test data after completion
 *
 * @testData
 * - `testUserId` - Organizer
 * - `applicantId` - Volunteer
 * - `activityId` - Activity for which user applies
 *
 * @dependencies
 * - Prisma Client for DB
 * - Next.js API route handlers
 * - Jest framework
 */

import { POST as createUser } from "@/app/api/VolunteerOrg/users/route";
import { POST as createActivity } from "@/app/api/VolunteerOrg/activities/route";
import { POST as applyToActivity } from "@/app/api/VolunteerOrg/applications/route";
import { GET as getActivityApplications } from "@/app/api/VolunteerOrg/activities/[id]/applications/route";
import { PUT as updateApplicationStatus } from "@/app/api/VolunteerOrg/applications/[id]/status/route";
import { POST as validateActivity } from "@/app/api/VolunteerOrg/admin/activities/[id]/validate/route";
import { NextRequest } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();

let testUserId: string;
let applicantIdApproved: string;
let applicantIdRejected: string;
let activityIdValidated: string;
let activityIdNonValidated: string;
let applicationIdApproved: string;
let applicationIdRejected: string;
const organizerEmail = "organizer_app_test@example.com";
const volunteerEmailApproved = "volunteer_app_test_approved@example.com";
const volunteerEmailRejected = "volunteer_app_test_rejected@example.com";
const adminEmail = "admin@example.com";

describe("VolunteerOrg - Applications API Tests", () => {
  // =========================
  // ✅ Cleanup before running tests
  // =========================
  beforeAll(async () => {
    await prisma.volunteerApplication.deleteMany();
    await prisma.volunteerActivity.deleteMany();
    await prisma.userVolunteerOrg.deleteMany({ where: { email: { in: [organizerEmail, volunteerEmailApproved, volunteerEmailRejected, adminEmail] } } });

    // Create admin
    const adminRes = await createUser(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: adminEmail,
        name: "a-Admin User",
        password: "password123",
        role: "admin",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const admin = await adminRes.json();
    const adminId = admin.id;

    // Create organizer
    const organizerRes = await createUser(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: organizerEmail,
        name: "Organizer User",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const organizer = await organizerRes.json();
    testUserId = organizer.id;

    // Create volunteer (approved)
    const volunteerApprovedRes = await createUser(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: volunteerEmailApproved,
        name: "Volunteer User Approved",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const volunteerApproved = await volunteerApprovedRes.json();
    applicantIdApproved = volunteerApproved.id;

    // Create volunteer (rejected)
    const volunteerRejectedRes = await createUser(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        email: volunteerEmailRejected,
        name: "Volunteer User Rejected",
        password: "password123",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const volunteerRejected = await volunteerRejectedRes.json();
    applicantIdRejected = volunteerRejected.id;

    // Create activity validated
    const activityRes = await createActivity(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "Food Drive",
        description: "Distribute food supplies",
        location: "Community Center",
        date: new Date().toISOString(),
        organizerId: testUserId,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const activity = await activityRes.json();
    activityIdValidated = activity.id;

    // validating the activity
    const validateRes = await validateActivity(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ adminId: adminId }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }), { params: { id: activityIdValidated } });

    expect(validateRes.status).toBe(200);

    // Create activity non-validated
    const activityRes2 = await createActivity(new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "Park Clean-up",
        description: "Clean up the city park",
        location: "Central Park",
        date: new Date().toISOString(),
        organizerId: testUserId,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }));
    const activity2 = await activityRes2.json();
    activityIdNonValidated = activity2.id;
  });

  // =========================
  // ✅ Apply (C)
  // =========================
  it("should not be able to apply to a volunteer activity - non-validated", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        userId: applicantIdApproved,
        activityId: activityIdNonValidated,
        motivation: "I want to help!",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await applyToActivity(req);
    expect(res.status).toBe(404);
    const err = await res.json();
    expect(err.error).toBe("Activity not yet validated");
  });

  it("should be able to apply to a volunteer activity - validated", async () => {
    // Apply as approved volunteer
    const reqApproved = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        userId: applicantIdApproved,
        activityId: activityIdValidated,
        motivation: "I want to help!",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const resApproved = await applyToActivity(reqApproved);
    expect(resApproved.status).toBe(201);
    const appApproved = await resApproved.json();
    applicationIdApproved = appApproved.id;

    expect(appApproved.userId).toBe(applicantIdApproved);

    // Apply as rejected volunteer
    const reqRejected = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        userId: applicantIdRejected,
        activityId: activityIdValidated,
        motivation: "I want to help!",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const resRejected = await applyToActivity(reqRejected);
    expect(resRejected.status).toBe(201);
    const appRejected = await resRejected.json();
    applicationIdRejected = appRejected.id;

    expect(appRejected.userId).toBe(applicantIdRejected);

    // Check if both applications are for the same activity
    expect(appApproved.activityId).toBe(activityIdValidated);
    expect(appRejected.activityId).toBe(activityIdValidated);
  });

  // =========================
  // ✅ Read (R)
  // =========================
  it("should fetch all applications for an activity", async () => {
    const req = new NextRequest(`http://localhost`);
    const res = await getActivityApplications(req, { params: { id: activityIdValidated } });

    expect(res.status).toBe(200);
    const list = await res.json();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    expect(list[0].activityId).toBe(activityIdValidated);
  });

  // =========================
  // ✅ Update Status (U)
  // =========================
  it("should confirm the application", async () => {
    const req = new NextRequest(`http://localhost`, {
      method: "PUT",
      body: JSON.stringify({ status: "confirmed" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await updateApplicationStatus(req, { params: { id: applicationIdApproved } });

    expect(res.status).toBe(200);
    const app = await res.json();
    expect(app.status).toBe("confirmed");
  });

  it("should reject the application", async () => {
    const req = new NextRequest(`http://localhost`, {
      method: "PUT",
      body: JSON.stringify({ status: "rejected" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await updateApplicationStatus(req, { params: { id: applicationIdRejected } });

    expect(res.status).toBe(200);
    const app = await res.json();
    expect(app.status).toBe("rejected");
  });

  it("should return error on invalid status", async () => {
    const req = new NextRequest(`http://localhost`, {
      method: "PUT",
      body: JSON.stringify({ status: "maybe" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await updateApplicationStatus(req, { params: { id: applicantIdRejected } });
    expect(res.status).toBe(400);
    const err = await res.json();
    expect(err.error).toBe("Invalid status");
  });

  // =========================
  // ✅ Cleanup remaining test data after tests
  // =========================
  afterAll(async () => {
    await prisma.volunteerApplication.deleteMany();
    await prisma.volunteerActivity.deleteMany();
    await prisma.userVolunteerOrg.deleteMany({ where: { email: { in: [organizerEmail, volunteerEmailApproved, volunteerEmailRejected, adminEmail] } } });
    await prisma.$disconnect();
  });

  // =========================
  // 📅 Date's:     
  // Created: 3/25/25       
  // Updated:
  // Status:         ✅ Complete
  // Remark:         Covers full flow for applications + organizer status control
  // =========================
});
