import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toColourRoom } from "@/lib/mappers";
import { colourRoomSchema } from "@/lib/validation";
import { deleteUploadedImage } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = colourRoomSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid room", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const before = await prisma.colourRoom.findUnique({
    where: { id: params.id },
    select: { imageUrl: true },
  });
  const row = await prisma.colourRoom.update({
    where: { id: params.id },
    data: parsed.data,
    include: { swatches: true },
  });
  if (before && before.imageUrl !== row.imageUrl) await deleteUploadedImage(before.imageUrl);
  return NextResponse.json(toColourRoom(row));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  // previews cascade with the room
  const row = await prisma.colourRoom.delete({ where: { id: params.id } });
  await deleteUploadedImage(row.imageUrl);
  return NextResponse.json({ ok: true });
}
