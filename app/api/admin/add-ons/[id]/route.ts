import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toAddOn } from "@/lib/mappers";
import { addOnUpdateSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = addOnUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid add-on", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.addOn.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(toAddOn(row));
}
