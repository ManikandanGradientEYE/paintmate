-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "addOnPainterCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customShadeBrand" TEXT,
ADD COLUMN     "customShadeCode" TEXT,
ADD COLUMN     "customShadeNote" TEXT;
