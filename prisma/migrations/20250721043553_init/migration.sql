-- CreateTable
CREATE TABLE "Sensors" (
    "id" SERIAL NOT NULL,
    "cribId" TEXT NOT NULL,
    "temperatureStatus" BOOLEAN NOT NULL,
    "movementStatus" BOOLEAN NOT NULL,
    "noiseStatus" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sensors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measures" (
    "id" SERIAL NOT NULL,
    "cribId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "movement" BOOLEAN NOT NULL,
    "noise" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "cribId" TEXT NOT NULL,
    "coldThreshold" DOUBLE PRECISION NOT NULL,
    "warmThreshold" DOUBLE PRECISION NOT NULL,
    "movement" BOOLEAN NOT NULL,
    "noise" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "cribId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "extra" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);
