-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hash" TEXT,
ADD COLUMN     "salt" TEXT,
ADD COLUMN     "token" TEXT;
