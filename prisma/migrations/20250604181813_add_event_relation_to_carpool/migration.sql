/*
  Warnings:

  - Added the required column `eventId` to the `Carpool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carpool" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Carpool" ADD CONSTRAINT "Carpool_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
