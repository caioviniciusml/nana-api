/*
  Warnings:

  - You are about to drop the `Measures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sensors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Measures";

-- DropTable
DROP TABLE "Notifications";

-- DropTable
DROP TABLE "Sensors";

-- DropTable
DROP TABLE "Settings";

-- CreateTable
CREATE TABLE "sensors" (
    "id" SERIAL NOT NULL,
    "crib_id" TEXT NOT NULL,
    "temp_sensor_status" BOOLEAN NOT NULL,
    "mov_sensor_status" BOOLEAN NOT NULL,
    "noise_sensor_status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sensors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measures" (
    "id" SERIAL NOT NULL,
    "crib_id" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "movement" BOOLEAN NOT NULL,
    "noise_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "crib_id" TEXT NOT NULL,
    "cold_threshold" DOUBLE PRECISION NOT NULL,
    "warm_threshold" DOUBLE PRECISION NOT NULL,
    "fan_auto_mode" BOOLEAN NOT NULL,
    "fan_speed" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "crib_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "extra" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);
