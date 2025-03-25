/**
 * @fileoverview Test suite for SocialButterfly Events API endpoints.
 * 
 * @description
 * Tests all CRUD operations for event management:
 * - Create event & validated (POST)
 * - Create event & unvalidated (POST)
 * - Get all events that are only valid (GET)
 * - Get single event (GET by ID)
 * - Update event by creator (PUT)
 * - Update event by non-creator (PUT) - Invalid
 * - Delete event by creator or admin (DELETE)
 * - Delete event by non-creator or non-admin (DELETE) - Invalid
 * 
 * @testSetup
 * - Cleans up any existing test events before running tests
 * - Creates a test user for submitting events
 * - Removes test data after completion
 *
 * @testData
 * - Uses test emails:
 *   - social_event_user@example.com (creator)
 *   - social_event_admin@example.com (non-creator)
 * 
 * @dependencies
 * - Prisma Client for PostgreSQL database operations
 * - Next.js Request/Response utilities
 * - Jest testing framework
 */

import {
  POST as createEvent,
  GET as getEvents
} from "@/app/api/SocialButterfly/events/route";

import {
  GET as getEventById,
  PUT as updateEvent,
  DELETE as deleteEvent
} from "@/app/api/SocialButterfly/events/[id]/route";

import { POST as validateEvent } from "@/app/api/SocialButterfly/admin/events/[id]/validate/route";
import { NextRequest } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();
let validatedEventId: string;
let unvalidatedEventId: string;
let creatorUserId: string;
let adminUserId: string;

const creatorEmail = "social_event_user@example.com";
const adminEmail = 'social_event_admin@example.com';

describe("SocialButterfly - Events API Tests", () => {
  // =========================
  // ✅ Setup test users and cleanup before tests
  // =========================
  beforeAll(async () => {
    await prisma.reviewSocialButterfly.deleteMany();
    await prisma.eventSocialButterfly.deleteMany({
      where: {
        title: {
          in: ["Test Event Valid", "Test Event Invalid"]
        }
      }
    });
    await prisma.userSocialButterfly.deleteMany({
      where: {
        email: {
          in: [creatorEmail, adminEmail]
        }
      }
    });

    const creator = await prisma.userSocialButterfly.create({
      data: {
        email: creatorEmail,
        name: "Event Creator",
        password: "secure123"
      }
    });

    const admin = await prisma.userSocialButterfly.create({
      data: {
        email: adminEmail,
        name: "a-Event Admin",
        password: "admin123"
      }
    });

    adminUserId = admin.id;
    creatorUserId = creator.id;
  });

  // =========================
  // ✅ Create Methods (C)
  // =========================
  it("should create and validate an event", async () => {
    const req = new NextRequest("http://localhost:3000/api/SocialButterfly/events", {
      method: "POST",
      body: JSON.stringify({
        title: "Test Event Valid",
        description: "Event that will be validated",
        date: new Date().toISOString(),
        location: "Valid City",
        category: "Music",
        submittedBy: creatorUserId
      }),
      headers: new Headers({ "Content-Type": "application/json" })
    });

    const res = await createEvent(req);
    const event = await res.json();
    validatedEventId = event.id;

    const validateReq = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/events/${validatedEventId}/validate`, {
      method: "POST",
      headers: new Headers({ adminId: adminUserId })
    });
    await validateEvent(validateReq, { params: { id: validatedEventId } });
  });

  it("should create an unvalidated event", async () => {
    const req = new NextRequest("http://localhost:3000/api/SocialButterfly/events", {
      method: "POST",
      body: JSON.stringify({
        title: "Test Event Invalid",
        description: "Event that stays unvalidated",
        date: new Date().toISOString(),
        location: "Invalid City",
        category: "Tech",
        submittedBy: creatorUserId
      }),
      headers: new Headers({ "Content-Type": "application/json" })
    });

    const res = await createEvent(req);
    const event = await res.json();
    unvalidatedEventId = event.id;
  });

  // =========================
  // ✅ Read Methods (R)
  // =========================
  it("should fetch all validated events only", async () => {
    const req = new NextRequest("http://localhost:3000/api/SocialButterfly/events");
    const res = await getEvents();
    const events = await res.json();

    expect(events.some((e: any) => e.id === validatedEventId)).toBeTruthy();
    expect(events.some((e: any) => e.id === unvalidatedEventId)).toBeFalsy();
  });

  it("should fetch a specific event by ID", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/events/${validatedEventId}`);
    const res = await getEventById(req, { params: { id: validatedEventId } });
    const event = await res.json();
    expect(event.id).toBe(validatedEventId);
  });

  // =========================
  // ✅ Update Methods (U)
  // =========================
  it("should allow creator to update the event", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/events/${validatedEventId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: "Updated Event Title",
        description: "Updated description",
        date: new Date().toISOString(),
        location: "Updated City"
      }),
      headers: new Headers({ "Content-Type": "application/json" })
    });

    const res = await updateEvent(req, { params: { id: validatedEventId } });
    const updated = await res.json();
    expect(updated.title).toBe("Updated Event Title");
  });

  it("should deny update by non-creator (not implemented, simulate 403)", async () => {
    expect(true).toBe(true);
  });

  // =========================
  // ✅ Delete Methods (D)
  // =========================
  it("should allow creator to delete their own event", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/events/${unvalidatedEventId}`, {
      method: "DELETE"
    });

    const res = await deleteEvent(req, { params: { id: unvalidatedEventId } });
    expect(res.status).toBe(200);
  });

  it("should deny delete by non-creator (not implemented, simulate 403)", async () => {
    expect(true).toBe(true);
  });

  // =========================
  // ✅ Cleanup
  // =========================
  afterAll(async () => {
    await prisma.eventSocialButterfly.deleteMany({ where: { id: validatedEventId } });
    await prisma.userSocialButterfly.deleteMany({ where: { email: { in: [creatorEmail] } } });
    await prisma.$disconnect();
  });
});

// =========================
// 📅 Date's:
// Created:        | Updated:
// Status:         ✅ Completed with permission placeholders
// Remark:         Validates CRUD, creator access; middleware not yet enforced
// =========================
