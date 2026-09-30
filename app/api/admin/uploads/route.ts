import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
// Vercel caps a function's request body at 4.5 MB; the admin UI resizes before
// uploading, so this is only a backstop.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Use a PNG, JPEG or WebP image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 4 MB)" }, { status: 400 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image uploads aren't set up: BLOB_READ_WRITE_TOKEN is missing" },
      { status: 500 }
    );
  }
  try {
    const blob = await put(`uploads/${file.name}`, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json(
      { error: `Upload failed: ${error instanceof Error ? error.message : "unknown error"}` },
      { status: 500 }
    );
  }
}
