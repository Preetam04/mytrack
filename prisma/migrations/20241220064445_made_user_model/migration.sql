-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('Google', 'Credentials');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "Providers" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
