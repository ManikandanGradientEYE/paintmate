import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { surfacesToDb, toPaint } from "@/lib/mappers";
import { paintSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.paint.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(toPaint));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = paintSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid paint", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { surfaces, whyPick, ...rest } = parsed.data;
  const row = await prisma.paint.create({
    data: { ...rest, surfaces: surfacesToDb(surfaces), whyPick: whyPick ?? null },
  });
  return NextResponse.json(toPaint(row), { status: 201 });
}
