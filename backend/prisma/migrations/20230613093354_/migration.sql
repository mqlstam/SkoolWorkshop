/*
  Warnings:

  - You are about to drop the column `groupSize` on the `Workshop` table. All the data in the column will be lost.
  - You are about to drop the column `timesPerWeek` on the `Workshop` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `WorkshopItem` table. All the data in the column will be lost.
  - Added the required column `bufferStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people` to the `WorkshopItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `WorkshopItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `bufferStock` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Workshop` DROP COLUMN `groupSize`,
    DROP COLUMN `timesPerWeek`;

-- AlterTable
ALTER TABLE `WorkshopItem` ADD COLUMN `people` INTEGER NOT NULL;
