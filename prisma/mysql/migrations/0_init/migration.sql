-- CreateTable
CREATE TABLE `HomeSize` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `sublabel` VARCHAR(191) NOT NULL,
    `sqft` INTEGER NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paint` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `pricePerLitre` DOUBLE NOT NULL,
    `tier` VARCHAR(191) NOT NULL,
    `recommended` BOOLEAN NOT NULL DEFAULT false,
    `isJiwan` BOOLEAN NOT NULL DEFAULT false,
    `approxPrice` BOOLEAN NOT NULL DEFAULT false,
    `surfaces` VARCHAR(191) NOT NULL,
    `whyPick` TEXT NULL,
    `imageUrl` TEXT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shade` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `hex` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Shade_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AddOn` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `defaultOn` BOOLEAN NOT NULL DEFAULT false,
    `priced` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `AddOn_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogProduct` (
    `id` VARCHAR(191) NOT NULL,
    `categoryLabel` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `swatch` VARCHAR(191) NOT NULL,
    `cta` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PricingSetting` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'singleton',
    `paintCoverageSqftPerLitrePerCoat` DOUBLE NOT NULL DEFAULT 133.33,
    `primerCoverageSqftPerLitre` DOUBLE NOT NULL DEFAULT 125,
    `primerPriceInterior` DOUBLE NOT NULL DEFAULT 70,
    `primerPriceExterior` DOUBLE NOT NULL DEFAULT 85,
    `gstRate` DOUBLE NOT NULL DEFAULT 0.18,
    `deliveryFeeLudhiana` DOUBLE NOT NULL DEFAULT 99,
    `estimateRangePct` DOUBLE NOT NULL DEFAULT 0.06,
    `puttyBagKg` DOUBLE NOT NULL DEFAULT 30,
    `puttyPricePerBag` DOUBLE NOT NULL DEFAULT 515,
    `puttyCoverageSqftPerKg` DOUBLE NOT NULL DEFAULT 11.11,
    `painterRatePerSqft` DOUBLE NOT NULL DEFAULT 7,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `locality` VARCHAR(191) NULL,
    `homeSizeLabel` VARCHAR(191) NULL,
    `areaSqft` INTEGER NOT NULL,
    `surface` VARCHAR(191) NOT NULL,
    `coats` INTEGER NOT NULL,
    `paintName` VARCHAR(191) NOT NULL,
    `paintBrand` VARCHAR(191) NOT NULL,
    `paintPricePerLitre` DOUBLE NOT NULL,
    `addOnPutty` BOOLEAN NOT NULL,
    `addOnPrimer` BOOLEAN NOT NULL,
    `addOnPainter` BOOLEAN NOT NULL,
    `addOnPainterCount` INTEGER NOT NULL DEFAULT 0,
    `shadeCode` VARCHAR(191) NULL,
    `customShadeBrand` VARCHAR(191) NULL,
    `customShadeCode` VARCHAR(191) NULL,
    `customShadeNote` TEXT NULL,
    `estimateTotal` DOUBLE NOT NULL,
    `estimateRangeLow` DOUBLE NOT NULL,
    `estimateRangeHigh` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'new',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ColourRoom` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ColourSwatch` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `hex` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `body` TEXT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialLink` (
    `id` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ColourSwatch` ADD CONSTRAINT `ColourSwatch_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `ColourRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

