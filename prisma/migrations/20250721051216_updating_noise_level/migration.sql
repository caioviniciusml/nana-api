/*
  Warnings:

  - You are about to drop the column `noise_level` on the `measures` table. All the data in the column will be lost.
  - Added the required column `noise` to the `measures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "measures" DROP COLUMN "noise_level",
ADD COLUMN     "noise" INTEGER NOT NULL;
