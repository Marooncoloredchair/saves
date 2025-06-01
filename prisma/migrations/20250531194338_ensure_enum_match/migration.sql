/*
  Warnings:

  - The values [GOING,NOT_GOING,MAYBE] on the enum `RSVPStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RSVPStatus_new" AS ENUM ('ATTENDING', 'NOT_ATTENDING');
ALTER TABLE "RSVP" ALTER COLUMN "status" TYPE "RSVPStatus_new" USING ("status"::text::"RSVPStatus_new");
ALTER TYPE "RSVPStatus" RENAME TO "RSVPStatus_old";
ALTER TYPE "RSVPStatus_new" RENAME TO "RSVPStatus";
DROP TYPE "RSVPStatus_old";
COMMIT;
