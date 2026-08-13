-- CreateTable
CREATE TABLE "HomeSize" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sublabel" TEXT NOT NULL,
    "sqft" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "HomeSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "pricePerLitre" DOUBLE PRECISION NOT NULL,
    "tier" TEXT NOT NULL,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "isJiwan" BOOLEAN NOT NULL DEFAULT false,
    "approxPrice" BOOLEAN NOT NULL DEFAULT false,
    "surfaces" TEXT NOT NULL,
    "whyPick" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Paint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shade" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Shade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddOn" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "defaultOn" BOOLEAN NOT NULL DEFAULT false,
    "priced" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AddOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogProduct" (
    "id" TEXT NOT NULL,
    "categoryLabel" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "swatch" TEXT NOT NULL,
    "cta" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CatalogProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingSetting" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "paintCoverageSqftPerLitrePerCoat" DOUBLE PRECISION NOT NULL DEFAULT 133.33,
    "primerCoverageSqftPerLitre" DOUBLE PRECISION NOT NULL DEFAULT 125,
    "primerPriceInterior" DOUBLE PRECISION NOT NULL DEFAULT 70,
    "primerPriceExterior" DOUBLE PRECISION NOT NULL DEFAULT 85,
    "gstRate" DOUBLE PRECISION NOT NULL DEFAULT 0.18,
    "deliveryFeeLudhiana" DOUBLE PRECISION NOT NULL DEFAULT 99,
    "estimateRangePct" DOUBLE PRECISION NOT NULL DEFAULT 0.06,
    "puttyBagKg" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "puttyPricePerBag" DOUBLE PRECISION NOT NULL DEFAULT 515,
    "puttyCoverageSqftPerKg" DOUBLE PRECISION NOT NULL DEFAULT 11.11,

    CONSTRAINT "PricingSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "locality" TEXT,
    "homeSizeLabel" TEXT,
    "areaSqft" INTEGER NOT NULL,
    "surface" TEXT NOT NULL,
    "coats" INTEGER NOT NULL,
    "paintName" TEXT NOT NULL,
    "paintBrand" TEXT NOT NULL,
    "paintPricePerLitre" DOUBLE PRECISION NOT NULL,
    "addOnPutty" BOOLEAN NOT NULL,
    "addOnPrimer" BOOLEAN NOT NULL,
    "addOnPainter" BOOLEAN NOT NULL,
    "shadeCode" TEXT,
    "estimateTotal" DOUBLE PRECISION NOT NULL,
    "estimateRangeLow" DOUBLE PRECISION NOT NULL,
    "estimateRangeHigh" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shade_code_key" ON "Shade"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AddOn_slug_key" ON "AddOn"("slug");
