import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toSocialLink } from "@/lib/mappers";
import { socialLinkSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = socialLinkSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid link", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.socialLink.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return NextResponse.json(toSocialLink(row));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.socialLink.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
