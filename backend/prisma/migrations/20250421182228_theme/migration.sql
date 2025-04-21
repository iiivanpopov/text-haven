/*
  Warnings:

  - You are about to drop the column `defaultTextType` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Token` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('light', 'dark');

-- DropIndex
DROP INDEX "File_userId_folderId_name_idx";

-- DropIndex
DROP INDEX "Folder_userId_name_idx";

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "defaultTextType",
ADD COLUMN     "textDefaultType" "FileType" NOT NULL DEFAULT 'NOTE',
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'light';

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateIndex
CREATE INDEX "File_userId_folderId_idx" ON "File"("userId", "folderId");

-- CreateIndex
CREATE INDEX "Folder_userId_parentId_idx" ON "Folder"("userId", "parentId");
