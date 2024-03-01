-- CreateTable
CREATE TABLE `customers` (
    `id_cust` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(12) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_cust`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id_product` INTEGER NOT NULL AUTO_INCREMENT,
    `prod_name` VARCHAR(255) NOT NULL,
    `prod_unit` INTEGER NOT NULL,
    `prod_price` INTEGER NOT NULL,

    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id_orders` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `discount` DECIMAL NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `id_cust` INTEGER NOT NULL,

    PRIMARY KEY (`id_orders`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productOrders` (
    `id_prodOrders` INTEGER NOT NULL AUTO_INCREMENT,
    `id_orders` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id_prodOrders`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_id_cust_fkey` FOREIGN KEY (`id_cust`) REFERENCES `customers`(`id_cust`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productOrders` ADD CONSTRAINT `productOrders_id_orders_fkey` FOREIGN KEY (`id_orders`) REFERENCES `orders`(`id_orders`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productOrders` ADD CONSTRAINT `productOrders_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;
