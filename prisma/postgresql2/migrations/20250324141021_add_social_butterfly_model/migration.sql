-- CreateTable
CREATE TABLE "UserSocialButterfly" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSocialButterfly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSocialButterfly" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventSocialButterfly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewSocialButterfly" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewSocialButterfly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeSocialButterfly" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikeSocialButterfly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkSocialButterfly" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookmarkSocialButterfly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportSocialButterfly" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "reviewId" TEXT,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportSocialButterfly_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSocialButterfly_email_key" ON "UserSocialButterfly"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LikeSocialButterfly_eventId_userId_key" ON "LikeSocialButterfly"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "BookmarkSocialButterfly_eventId_userId_key" ON "BookmarkSocialButterfly"("eventId", "userId");

-- AddForeignKey
ALTER TABLE "EventSocialButterfly" ADD CONSTRAINT "EventSocialButterfly_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES "UserSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewSocialButterfly" ADD CONSTRAINT "ReviewSocialButterfly_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewSocialButterfly" ADD CONSTRAINT "ReviewSocialButterfly_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeSocialButterfly" ADD CONSTRAINT "LikeSocialButterfly_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeSocialButterfly" ADD CONSTRAINT "LikeSocialButterfly_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkSocialButterfly" ADD CONSTRAINT "BookmarkSocialButterfly_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkSocialButterfly" ADD CONSTRAINT "BookmarkSocialButterfly_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportSocialButterfly" ADD CONSTRAINT "ReportSocialButterfly_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportSocialButterfly" ADD CONSTRAINT "ReportSocialButterfly_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportSocialButterfly" ADD CONSTRAINT "ReportSocialButterfly_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "ReviewSocialButterfly"("id") ON DELETE CASCADE ON UPDATE CASCADE;
