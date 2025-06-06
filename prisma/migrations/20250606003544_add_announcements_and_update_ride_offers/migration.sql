/*
  Warnings:

  - The values [APPROVED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `capacity` on the `RideOffer` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `RideOffer` table. All the data in the column will be lost.
  - You are about to drop the `ContactMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `RideOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "RideRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "RideRequest" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "RequestStatus_old";
ALTER TABLE "RideRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "RideOffer" DROP CONSTRAINT "RideOffer_driverId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT;

-- Update existing announcements with a default user
UPDATE "Announcement" SET "userId" = (SELECT "id" FROM "User" WHERE "email" = 'admin@saves.org' LIMIT 1);

-- Make userId required after setting default values
ALTER TABLE "Announcement" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "RideOffer" DROP COLUMN "capacity",
DROP COLUMN "driverId",
ADD COLUMN     "maxPassengers" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "pickupLocation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pickupTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT;

-- Update existing ride offers with a default user
UPDATE "RideOffer" SET "userId" = (SELECT "id" FROM "User" WHERE "email" = 'admin@saves.org' LIMIT 1);

-- Make userId required after setting default values
ALTER TABLE "RideOffer" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "ContactMessage";

-- AddForeignKey
ALTER TABLE "RideOffer" ADD CONSTRAINT "RideOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
