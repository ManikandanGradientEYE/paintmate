import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { surfacesToDb, toPaint } from "@/lib/mappers";
import { paintSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = paintSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid paint", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { surfaces, whyPick, imageUrl, ...rest } = parsed.data;
  const row = await prisma.paint.update({
    where: { id: params.id },
    data: {
      ...rest,
      ...(surfaces ? { surfaces: surfacesToDb(surfaces) } : {}),
      ...(whyPick !== undefined ? { whyPick } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
    },
  });
  return NextResponse.json(toPaint(row));
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.paint.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
