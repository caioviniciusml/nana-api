-- CreateTable
CREATE TABLE "cribs" (
    "id" SERIAL NOT NULL,
    "crib_id" TEXT NOT NULL,
    "crib_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cribs_pkey" PRIMARY KEY ("id")
);
