-- The room now carries one transparent-background PNG; swatches only carry a colour,
-- which is painted behind that PNG. Migrate the existing rows rather than dropping them.

-- AlterTable: add imageUrl to ColourRoom, backfilled from its first preview
ALTER TABLE "ColourRoom" ADD COLUMN "imageUrl" TEXT;

UPDATE "ColourRoom" r
SET "imageUrl" = COALESCE(
  (
    SELECT p."imageUrl"
    FROM "ColourPreview" p
    WHERE p."roomId" = r."id"
    ORDER BY p."sortOrder" ASC
    LIMIT 1
  ),
  '/assets/room.jpg'
);

ALTER TABLE "ColourRoom" ALTER COLUMN "imageUrl" SET NOT NULL;

-- CreateTable: ColourSwatch replaces ColourPreview (same rows, minus the per-swatch image)
CREATE TABLE "ColourSwatch" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ColourSwatch_pkey" PRIMARY KEY ("id")
);

INSERT INTO "ColourSwatch" ("id", "roomId", "hex", "sortOrder")
SELECT "id", "roomId", "hex", "sortOrder" FROM "ColourPreview";

-- AddForeignKey
ALTER TABLE "ColourSwatch" ADD CONSTRAINT "ColourSwatch_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ColourRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropTable
DROP TABLE "ColourPreview";
