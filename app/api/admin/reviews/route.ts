import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toReview } from "@/lib/mappers";
import { reviewSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(toReview));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid review", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.review.create({ data: parsed.data });
  return NextResponse.json(toReview(row), { status: 201 });
}
