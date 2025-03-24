-- CreateTable
CREATE TABLE "UserEduSeeker" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserEduSeeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformEduSeeker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PlatformEduSeeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewEduSeeker" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewEduSeeker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEduSeeker_email_key" ON "UserEduSeeker"("email");

-- AddForeignKey
ALTER TABLE "PlatformEduSeeker" ADD CONSTRAINT "PlatformEduSeeker_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES "UserEduSeeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewEduSeeker" ADD CONSTRAINT "ReviewEduSeeker_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "PlatformEduSeeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewEduSeeker" ADD CONSTRAINT "ReviewEduSeeker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEduSeeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
