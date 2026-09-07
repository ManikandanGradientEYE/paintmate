-- CreateTable
CREATE TABLE "ColourRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ColourRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColourPreview" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ColourPreview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColourPreview" ADD CONSTRAINT "ColourPreview_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ColourRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
