-- CreateTable
CREATE TABLE "UserHealthTracker" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHealthTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleHealthTracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduleHealthTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordHealthTracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordHealthTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicHealthTracker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "availableSlots" TEXT[],
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClinicHealthTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHealthTracker_email_key" ON "UserHealthTracker"("email");

-- AddForeignKey
ALTER TABLE "ScheduleHealthTracker" ADD CONSTRAINT "ScheduleHealthTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserHealthTracker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordHealthTracker" ADD CONSTRAINT "RecordHealthTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserHealthTracker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
