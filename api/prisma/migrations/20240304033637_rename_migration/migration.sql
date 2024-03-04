/*
  Warnings:

  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `id_cust` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `customers` table. All the data in the column will be lost.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `discount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `id_cust` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `id_orders` on the `orders` table. All the data in the column will be lost.
  - The primary key for the `productorders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_orders` on the `productorders` table. All the data in the column will be lost.
  - You are about to drop the column `id_prodOrders` on the `productorders` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `productorders` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `productorders` table. All the data in the column will be lost.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_product` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `prod_name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `prod_price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `prod_unit` on the `products` table. All the data in the column will be lost.
  - Added the required column `customerAddress` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDiscount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordersId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordersId` to the `ProductOrders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prodOrderQty` to the `ProductOrders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prodOrdersId` to the `ProductOrders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductOrders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productUnit` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_id_cust_fkey`;

-- DropForeignKey
ALTER TABLE `productorders` DROP FOREIGN KEY `productOrders_id_orders_fkey`;

-- DropForeignKey
ALTER TABLE `productorders` DROP FOREIGN KEY `productOrders_product_id_fkey`;

-- AlterTable
ALTER TABLE `customers`
  CHANGE `id_cust` `customerId` INTEGER NOT NULL AUTO_INCREMENT,
  CHANGE `name` `customerName` VARCHAR(255) NOT NULL,
  CHANGE `address` `customerAddress` VARCHAR(255) NOT NULL,
  CHANGE `email` `customerEmail` VARCHAR(255) NOT NULL,
  CHANGE `phone` `customerPhone` VARCHAR(12) NOT NULL;


-- AlterTable
ALTER TABLE `orders`
    CHANGE `discount` `orderDiscount` DECIMAL NOT NULL,
    CHANGE `id_cust` `customerId` INTEGER NOT NULL,
    CHANGE `id_orders` `ordersId` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `productorders`
    CHANGE`id_orders` `ordersId` INTEGER NOT NULL,
    CHANGE `id_prodOrders` `prodOrdersId` INTEGER NOT NULL AUTO_INCREMENT,
    CHANGE `product_id` `productId` INTEGER NOT NULL,
    CHANGE `quantity` `prodOrderQty` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` 
    CHANGE `id_product` `productId` INTEGER NOT NULL AUTO_INCREMENT,
    CHANGE `prod_name` `productName` VARCHAR(255) NOT NULL,
    CHANGE `prod_price` `productPrice` INTEGER NOT NULL,
    CHANGE `prod_unit` `productUnit` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOrders` ADD CONSTRAINT `ProductOrders_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `orders`(`ordersId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOrders` ADD CONSTRAINT `ProductOrders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
