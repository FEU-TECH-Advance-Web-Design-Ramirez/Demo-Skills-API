-- CreateTable
CREATE TABLE "UserFinanceManager" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFinanceManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionFinanceManager" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "source" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionFinanceManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalFinanceManager" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetAmount" DECIMAL(65,30) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoalFinanceManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFinanceManager_email_key" ON "UserFinanceManager"("email");

-- AddForeignKey
ALTER TABLE "TransactionFinanceManager" ADD CONSTRAINT "TransactionFinanceManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserFinanceManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalFinanceManager" ADD CONSTRAINT "GoalFinanceManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserFinanceManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;
