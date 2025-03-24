-- CreateTable
CREATE TABLE "UserMentalWellness" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMentalWellness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalMentalWellness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "entryText" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JournalMentalWellness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentMentalWellness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssessmentMentalWellness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meditation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meditation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeditationFeedback" (
    "id" TEXT NOT NULL,
    "meditationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeditationFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalMentalWellness" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HospitalMentalWellness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMentalWellness_email_key" ON "UserMentalWellness"("email");

-- AddForeignKey
ALTER TABLE "JournalMentalWellness" ADD CONSTRAINT "JournalMentalWellness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserMentalWellness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentMentalWellness" ADD CONSTRAINT "AssessmentMentalWellness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserMentalWellness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeditationFeedback" ADD CONSTRAINT "MeditationFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserMentalWellness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeditationFeedback" ADD CONSTRAINT "MeditationFeedback_meditationId_fkey" FOREIGN KEY ("meditationId") REFERENCES "Meditation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
