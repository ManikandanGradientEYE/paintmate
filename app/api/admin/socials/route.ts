import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toSocialLink } from "@/lib/mappers";
import { socialLinkSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(toSocialLink));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = socialLinkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid link", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.socialLink.create({ data: parsed.data });
  return NextResponse.json(toSocialLink(row), { status: 201 });
}
