/*
  Warnings:

  - Made the column `slug` on table `berita` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `berita` MODIFY `slug` VARCHAR(191) NOT NULL;
