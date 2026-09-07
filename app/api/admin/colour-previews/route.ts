import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { colourPreviewSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = colourPreviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid colour", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.colourPreview.create({ data: parsed.data });
  return NextResponse.json(row, { status: 201 });
}
