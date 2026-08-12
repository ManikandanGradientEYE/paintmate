import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toLead } from "@/lib/mappers";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(rows.map(toLead));
}
