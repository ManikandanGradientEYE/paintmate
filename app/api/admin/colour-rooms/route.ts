import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toColourRoom } from "@/lib/mappers";
import { colourRoomSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.colourRoom.findMany({
    orderBy: { sortOrder: "asc" },
    include: { previews: true },
  });
  return NextResponse.json(rows.map(toColourRoom));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = colourRoomSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid room", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.colourRoom.create({
    data: parsed.data,
    include: { previews: true },
  });
  return NextResponse.json(toColourRoom(row), { status: 201 });
}
