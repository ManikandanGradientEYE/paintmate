import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toHomeSize } from "@/lib/mappers";
import { homeSizeSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.homeSize.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(toHomeSize));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = homeSizeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid home size", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.homeSize.create({ data: parsed.data });
  return NextResponse.json(toHomeSize(row), { status: 201 });
}
