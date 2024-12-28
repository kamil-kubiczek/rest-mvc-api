/*
  Warnings:

  - You are about to drop the column `timestamp` on the `RefreshToken` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
