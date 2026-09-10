import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toReview } from "@/lib/mappers";
import { reviewSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = reviewSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid review", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.review.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(toReview(row));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.review.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
