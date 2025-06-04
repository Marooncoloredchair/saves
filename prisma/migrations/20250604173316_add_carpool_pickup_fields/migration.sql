/*
  Warnings:

  - Added the required column `pickupLocation` to the `Carpool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupTime` to the `Carpool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carpool" ADD COLUMN     "pickupLocation" TEXT NOT NULL,
ADD COLUMN     "pickupTime" TIMESTAMP(3) NOT NULL;
