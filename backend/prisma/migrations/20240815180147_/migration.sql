/*
  Warnings:

  - You are about to drop the column `bucketId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the `Bucket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `folderId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bucket" DROP CONSTRAINT "Bucket_userId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_bucketId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "bucketId",
ADD COLUMN     "folderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Bucket";

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
