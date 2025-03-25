/**
 * @fileoverview Test suite for SocialButterfly Admin API endpoints.
 * 
 * @description
 * Tests administrative operations including:
 * - Event validation (POST)
 * - Event validation non-admin (POST)
 * - Event Deletion (DELETE)
 * - Event Deletion non-admin (DELETE)
 * - Review validation (POST)
 * - Review validation non-admin (POST)
 * - Review deletion (DELETE)
 * - Review deletion non-admin  (DELETE)
 * 
 * @testSetup
 * - Cleans up existing test data before running tests
 * - Creates test admin user
 * - Creates test event and review
 * - Removes test data after completion
 *
 * @testData
 * - Uses admin test email: admin_test@example.com
 * 
 * @dependencies
 * - Prisma Client for PostgreSQL database operations
 * - Next.js Request/Response utilities
 * - Jest testing framework
 */

import { POST as validateEvent } from "@/app/api/SocialButterfly/admin/events/[id]/validate/route"
import { DELETE as deleteEvent } from "@/app/api/SocialButterfly/admin/events/[id]/route"

import { POST as validateReview } from "@/app/api/SocialButterfly/admin/reviews/[id]/validate/route"
import { DELETE as deleteReview } from "@/app/api/SocialButterfly/admin/reviews/[id]/route"

import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2"
import { NextRequest } from "next/server"

const prisma = new PostgresqlClient()
let adminUserId: string
let testEventId: string
let testReviewId: string

const adminEmail = "admin_test@example.com"

describe("SocialButterfly - Admin API Tests", () => {

  // =========================
  // ✅ Cleanup before running tests
  // =========================
  beforeAll(async () => {
    await prisma.reviewSocialButterfly.deleteMany()
    await prisma.eventSocialButterfly.deleteMany({ where: { title: "Admin Event" } })
    await prisma.userSocialButterfly.deleteMany({ where: { email: adminEmail } })

    const adminUser = await prisma.userSocialButterfly.create({
      data: {
        email: adminEmail,
        name: "a-admin", // must start with "a-"
        password: "admin123"
      }
    })

    const event = await prisma.eventSocialButterfly.create({
      data: {
        title: "Admin Event",
        description: "Event for admin tests",
        date: new Date(Date.now() + 86400000),
        location: "Admin City",
        category: "Panel",
        submittedBy: adminUser.id
      }
    })

    const review = await prisma.reviewSocialButterfly.create({
      data: {
        userId: adminUser.id,
        eventId: event.id,
        rating: 2,
        comment: "Could be better"
      }
    })

    adminUserId = adminUser.id
    testEventId = event.id
    testReviewId = review.id
  })

  // =========================
  // ✅ Event Validation
  // =========================
  it("should allow admin to validate an event", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/events/${testEventId}/validate`, {
      method: "POST",
      headers: new Headers({ adminId: adminUserId })
    })

    const res = await validateEvent(req, { params: { id: testEventId } })
    expect(res.status).toBe(200)

    const result = await res.json()
    expect(result.event.validated).toBe(true)
  })

  it("should block event validation without adminId", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/events/${testEventId}/validate`, {
      method: "POST"
    })

    const res = await validateEvent(req, { params: { id: testEventId } })
    expect(res.status).toBe(401)
  })

  // =========================
  // ✅ Review Validation
  // =========================
  it("should allow admin to validate a review", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/reviews/${testReviewId}/validate`, {
      method: "POST",
      headers: new Headers({ adminId: adminUserId })
    })

    const res = await validateReview(req, { params: { id: testReviewId } })
    expect(res.status).toBe(200)

    const result = await res.json()
    expect(result.review.validated).toBe(true)
  })

  it("should block review validation without adminId", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/reviews/${testReviewId}/validate`, {
      method: "POST"
    })

    const res = await validateReview(req, { params: { id: testReviewId } })
    expect(res.status).toBe(401)
  })

  // =========================
  // ✅ Review Deletion
  // =========================
  it("should allow admin to delete a review", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/reviews/${testReviewId}`, {
      method: "DELETE",
      headers: new Headers({ adminId: adminUserId })
    })

    const res = await deleteReview(req, { params: { id: testReviewId } })
    expect(res.status).toBe(200)

    const msg = await res.json()
    expect(msg.message).toBe("Review deleted successfully")
  })

  it("should block review deletion without adminId", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/reviews/${testReviewId}`, {
      method: "DELETE"
    })

    const res = await deleteReview(req, { params: { id: testReviewId } })
    expect(res.status).toBe(401)
  })

  // =========================
  // ✅ Event Deletion
  // =========================
  it("should allow admin to delete an event", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/events/${testEventId}`, {
      method: "DELETE",
      headers: new Headers({ adminId: adminUserId })
    })

    const res = await deleteEvent(req, { params: { id: testEventId } })
    expect(res.status).toBe(200)

    const result = await res.json()
    expect(result.message).toBe("Event deleted successfully")
  })

  it("should block event deletion without adminId", async () => {
    const req = new NextRequest(`http://localhost:3000/api/SocialButterfly/admin/events/${testEventId}`, {
      method: "DELETE"
    })

    const res = await deleteEvent(req, { params: { id: testEventId } })
    expect(res.status).toBe(401)
  })

  // =========================
  // ✅ Cleanup remaining test data after tests
  // =========================
  afterAll(async () => {
    await prisma.reviewSocialButterfly.deleteMany()
    await prisma.eventSocialButterfly.deleteMany({ where: { id: testEventId } })
    await prisma.userSocialButterfly.deleteMany({ where: { id: adminUserId } })
    await prisma.$disconnect()
  })
})

// =========================
// 📅 Date's:
// Created:        | Updated:
// Status:         ✅ Completed
// Remark:         Full admin control tested with enforced auth via header
// =========================
