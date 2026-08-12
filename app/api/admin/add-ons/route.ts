import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toAddOn } from "@/lib/mappers";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.addOn.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(toAddOn));
}
