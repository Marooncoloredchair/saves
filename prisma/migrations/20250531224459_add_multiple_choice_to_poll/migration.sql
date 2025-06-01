/*
  Warnings:

  - A unique constraint covering the columns `[pollId,userId,optionIdx]` on the table `PollVote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PollVote_pollId_userId_key";

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "multipleChoice" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "PollVote_pollId_userId_optionIdx_key" ON "PollVote"("pollId", "userId", "optionIdx");
