import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { colourSwatchSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = colourSwatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid colour", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.colourSwatch.create({ data: parsed.data });
  return NextResponse.json(row, { status: 201 });
}
