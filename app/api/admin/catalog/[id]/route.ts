import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCatalogProduct } from "@/lib/mappers";
import { catalogProductSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = catalogProductSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.catalogProduct.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return NextResponse.json(toCatalogProduct(row));
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.catalogProduct.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
