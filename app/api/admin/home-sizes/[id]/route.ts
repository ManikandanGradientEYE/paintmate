import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toHomeSize } from "@/lib/mappers";
import { homeSizeSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = homeSizeSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid home size", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.homeSize.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(toHomeSize(row));
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.homeSize.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
