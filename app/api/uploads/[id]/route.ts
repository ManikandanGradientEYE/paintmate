import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Public: serves an image uploaded from the admin panel. An id always holds the same
 * bytes (a replaced image gets a new id), so browsers may cache it for good. */
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const image = await prisma.uploadedImage.findUnique({ where: { id: params.id } });
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": String(image.data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
