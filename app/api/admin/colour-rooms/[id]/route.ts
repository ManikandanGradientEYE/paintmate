import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toColourRoom } from "@/lib/mappers";
import { colourRoomSchema } from "@/lib/validation";

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
  const row = await prisma.colourRoom.update({
    where: { id: params.id },
    data: parsed.data,
    include: { swatches: true },
  });
  return NextResponse.json(toColourRoom(row));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  // previews cascade with the room
  await prisma.colourRoom.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
