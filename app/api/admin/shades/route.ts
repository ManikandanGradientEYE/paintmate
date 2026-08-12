import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toShade } from "@/lib/mappers";
import { shadeSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.shade.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(toShade));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = shadeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid shade", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.shade.create({ data: parsed.data });
  return NextResponse.json(toShade(row), { status: 201 });
}
