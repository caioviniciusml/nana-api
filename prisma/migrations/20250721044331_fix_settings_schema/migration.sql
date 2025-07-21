/*
  Warnings:

  - You are about to drop the column `movement` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `noise` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `fanAutoMode` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fanSpeed` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "movement",
DROP COLUMN "noise",
ADD COLUMN     "fanAutoMode" BOOLEAN NOT NULL,
ADD COLUMN     "fanSpeed" INTEGER NOT NULL;
