-- CreateTable
CREATE TABLE "UserMusicLover" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMusicLover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcertMusicLover" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcertMusicLover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewMusicLover" (
    "id" TEXT NOT NULL,
    "concertId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewMusicLover_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMusicLover_email_key" ON "UserMusicLover"("email");

-- AddForeignKey
ALTER TABLE "ConcertMusicLover" ADD CONSTRAINT "ConcertMusicLover_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES "UserMusicLover"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewMusicLover" ADD CONSTRAINT "ReviewMusicLover_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserMusicLover"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewMusicLover" ADD CONSTRAINT "ReviewMusicLover_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "ConcertMusicLover"("id") ON DELETE CASCADE ON UPDATE CASCADE;
