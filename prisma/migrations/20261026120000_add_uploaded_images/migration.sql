-- CreateTable
CREATE TABLE `UploadedImage` (
    `id` VARCHAR(191) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `data` MEDIUMBLOB NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

