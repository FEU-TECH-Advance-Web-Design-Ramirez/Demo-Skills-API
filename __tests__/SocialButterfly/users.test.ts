/**
 * @fileoverview Test suite for SocialButterfly Users API endpoints.
 * 
 * @description
 * Tests all CRUD operations for user management:
 * - Create user (POST)
 * - Get all users (GET)
 * - Get single user (GET by ID)
 * - Update user (PUT)
 * - Delete user (DELETE)
 * 
 * @testSetup
 * - Cleans up any existing test users before running tests
 * - Creates a test user for subsequent operations
 * - Removes test data after completion
 *
 * @testData
 * - Uses a test email: socialbutterfly_test@example.com
 * 
 * @dependencies
 * - Prisma Client for PostgreSQL database operations
 * - Next.js Request/Response utilities
 * - Jest testing framework
 */

import {
  POST as createUser,
  GET as getUsers
} from "@/app/api/SocialButterfly/users/route";

import {
  GET as getUserById,
  PUT as updateUser,
  DELETE as deleteUser
} from "@/app/api/SocialButterfly/users/[id]/route";

import { NextRequest } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();
let testUserId: string;
const testEmail = "socialbutterfly_test@example.com";

// =========================
// ✅ SocialButterfly - Users API Tests
// =========================

describe("SocialButterfly - Users API Tests", () => {

  // =========================
  // ✅ Cleanup before running tests
  // =========================
  beforeAll(async () => {
    await prisma.userSocialButterfly.deleteMany({ where: { email: testEmail } });
  });

  // =========================
  // ✅ Create Methods (C)
  // =========================
  it("should create a new user", async () => {
    const req = new NextRequest("http://localhost:3000/api/SocialButterfly/users", {
      method: "POST",
      body: JSON.stringify({
        email: testEmail,
        name: "Test User",
        password: "supersecure",
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await createUser(req);
    expect(res.status).toBe(201);
    const user = await res.json();

    expect(user).toHaveProperty("id");
    expect(user.email).toBe(testEmail);
    testUserId = user.id;
  });

  // =========================
  // ✅ Read Methods (R)
  // =========================
  it("should fetch all users", async () => {
    const req = new NextRequest("http://localhost:3000/api/SocialButterfly/users");
    const res = await getUsers();

    expect(res.status).toBe(200);
    const users = await res.json();

    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    expect(users.some((u: any) => u.email === testEmail)).toBeTruthy();
  });

  it("should fetch user by ID", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/users/${testUserId}`);
    const res = await getUserById(req, { params: { id: testUserId } });

    expect(res.status).toBe(200);
    const user = await res.json();

    expect(user.id).toBe(testUserId);
    expect(user.email).toBe(testEmail);
  });

  // =========================
  // ✅ Update Methods (U)
  // =========================
  it("should update user name", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/users/${testUserId}`, {
      method: "PUT",
      body: JSON.stringify({ name: "Updated Test User" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await updateUser(req, { params: { id: testUserId } });
    expect(res.status).toBe(200);
    const user = await res.json();

    expect(user.name).toBe("Updated Test User");
  });

  // =========================
  // ✅ Delete Methods (D)
  // =========================
  it("should delete the user", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/users/${testUserId}`, {
      method: "DELETE",
    });

    const res = await deleteUser(req, { params: { id: testUserId } });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.message).toBe("User deleted successfully");
  });

  // =========================
  // ✅ Cleanup remaining test data after tests
  // =========================
  afterAll(async () => {
    await prisma.userSocialButterfly.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });
});

// =========================
// 📅 Date's:
// Created:        | Updated:
// Status:         ✅ Completed
// Remark:         CRUD flow for SocialButterfly user is now fully tested
// =========================
