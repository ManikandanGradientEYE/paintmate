import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCatalogProduct } from "@/lib/mappers";
import { catalogProductSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.catalogProduct.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(toCatalogProduct));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = catalogProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.catalogProduct.create({ data: parsed.data });
  return NextResponse.json(toCatalogProduct(row), { status: 201 });
}
