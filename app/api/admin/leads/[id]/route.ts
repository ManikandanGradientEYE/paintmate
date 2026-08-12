import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toLead } from "@/lib/mappers";
import { leadUpdateSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = leadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid update", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const row = await prisma.lead.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return NextResponse.json(toLead(row));
}
