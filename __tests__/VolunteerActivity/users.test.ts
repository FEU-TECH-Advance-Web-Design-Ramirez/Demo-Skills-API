/**
 * @fileoverview Test suite for Volunteer Organization User API endpoints.
 * Tests the complete CRUD operations for user management.
 * 
 * as follows:
 * - Creating a new user
 * - Create multiple dummy users
 * - Fetching user's list
 * - Fetching a single user by ID
 * - Updating a user
 * - Deleting a user
 * 
 * @description
 * This test suite validates the following API endpoints and operations:
 * - CREATE: POST /api/VolunteerOrg/users
 * - CREATE: POST /api/VolunteerOrg/users (multiple dummy users)
 * - READ: GET /api/VolunteerOrg/users
 * - READ: GET /api/VolunteerOrg/users/[id]
 * - UPDATE: PUT /api/VolunteerOrg/users/[id] 
 * - DELETE: DELETE /api/VolunteerOrg/users/[id]
 * 
 * @testSetup
 * - Cleans up any existing test users before running tests
 * - Creates a test user for subsequent operations
 * - Removes test data after completion
 * 
 * @testData
 * - Uses a test email: volunteerorg_test@example.com
 * - Generates and tracks a testUserId for CRUD operations
 * 
 * @dependencies
 * - Prisma Client for PostgreSQL database operations
 * - Next.js Request/Response utilities
 * - Jest testing framework
 */

import { POST as createUser, GET as getUserList } from "@/app/api/VolunteerOrg/users/route";
import { GET as getUserById, PUT as updateUser, DELETE as deleteUser } from "@/app/api/VolunteerOrg/users/[id]/route";
import { NextRequest } from "next/server";
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";

const prisma = new PostgresqlClient();
let testUserId: string;
const testEmail = "volunteerorg_test@example.com";

describe("VolunteerOrg - Users API Tests", () => {

  // =========================
  // ✅ Cleanup before running tests
  // =========================
  beforeAll(async () => {
    await prisma.userVolunteerOrg.deleteMany({ where: { email: testEmail } });
  });

  // =========================
  // ✅ Create Methods (C)
  // =========================
  it("should create a new user", async () => {
    const req = new NextRequest("http://localhost:3000/api/VolunteerOrg/users", {
      method: "POST",
      body: JSON.stringify({
        email: testEmail,
        name: "Volunteer User",
        password: "password123",
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

  it("should create multiple dummy users", async () => {
    for (let index = 0; index < 10; index++) {
      const req = new NextRequest("http://localhost:3000/api/VolunteerOrg/users", {
        method: "POST",
        body: JSON.stringify({
          email: `sample${index}@gmail.com`,
          name: `Sample User ${index}`,
          password: "password123",
        }),
      }
      );
      const res = await createUser(req);
      if (res.status === 409)
        continue;
      else
        expect(res.status).toBe(201);
    }
  });

  // =========================
  // ✅ Read Methods (R)
  // =========================
  it("should fetch a single user by ID", async () => {
    const req = new NextRequest(`http://localhost:3000/api/VolunteerOrg/users/${testUserId}`);
    const res = await getUserById(req, { params: { id: testUserId } });

    expect(res.status).toBe(200);
    const user = await res.json();
    expect(user.id).toBe(testUserId);
    expect(user.email).toBe(testEmail);
  });

  it("should fetch a list of users", async () => {
    const res = await getUserList();

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.users).toHaveLength
  });

  // =========================
  // ✅ Update Methods (U)
  // =========================
  it("should update a user", async () => {
    const req = new NextRequest(`http://localhost:3000/api/VolunteerOrg/users/${testUserId}`, {
      method: "PUT",
      body: JSON.stringify({ name: "Updated Volunteer User" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const res = await updateUser(req, { params: { id: testUserId } });
    expect(res.status).toBe(200);
    const user = await res.json();

    expect(user.name).toBe("Updated Volunteer User");
  });

  // =========================
  // ✅ Delete Methods (D)
  // =========================
  it("should delete a user", async () => {
    const req = new NextRequest(`http://localhost:3000/api/VolunteerOrg/users/${testUserId}`, {
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
    await prisma.userVolunteerOrg.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  // =========================
  // 📅 Date's:     
  // Created: 3/25/25       
  // Updated:
  // Status:         ✅ Complete
  // Remark:         Initial full CRUD test for VolunteerOrg User API
  // =========================
});
