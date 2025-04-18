-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('NOTE', 'POST');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" "FileType" NOT NULL DEFAULT 'NOTE';
