/*
  Warnings:

  - A unique constraint covering the columns `[crib_id]` on the table `cribs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cribs_crib_id_key" ON "cribs"("crib_id");
