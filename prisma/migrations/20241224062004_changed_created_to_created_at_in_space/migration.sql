/*
  Warnings:

  - You are about to drop the column `created` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "created",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
