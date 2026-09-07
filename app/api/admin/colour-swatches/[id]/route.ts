import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { colourSwatchUpdateSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = colourSwatchUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid colour", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.colourSwatch.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return NextResponse.json(row);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.colourSwatch.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
