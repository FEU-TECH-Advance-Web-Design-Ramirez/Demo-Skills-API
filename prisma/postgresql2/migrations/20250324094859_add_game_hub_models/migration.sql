-- CreateTable
CREATE TABLE "GameHubUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameHubUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameHubPlayer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "mainGame" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameHubPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameHubTournament" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rules" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameHubTournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameHubTournamentPlayer" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameHubTournamentPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameHubUser_email_key" ON "GameHubUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GameHubTournamentPlayer_tournamentId_playerId_key" ON "GameHubTournamentPlayer"("tournamentId", "playerId");

-- AddForeignKey
ALTER TABLE "GameHubPlayer" ADD CONSTRAINT "GameHubPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "GameHubUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHubTournament" ADD CONSTRAINT "GameHubTournament_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "GameHubUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHubTournamentPlayer" ADD CONSTRAINT "GameHubTournamentPlayer_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "GameHubTournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHubTournamentPlayer" ADD CONSTRAINT "GameHubTournamentPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "GameHubPlayer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
