/*
  Warnings:

  - You are about to alter the column `orderDiscount` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `orderDiscount` DECIMAL NOT NULL;
