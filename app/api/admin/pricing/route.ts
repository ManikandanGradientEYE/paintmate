import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toPricingSettings } from "@/lib/mappers";
import { pricingSettingsSchema } from "@/lib/validation";
import { DEFAULT_PRICING_SETTINGS } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function GET() {
  const row = await prisma.pricingSetting.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", ...DEFAULT_PRICING_SETTINGS },
  });
  return NextResponse.json(toPricingSettings(row));
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = pricingSettingsSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid pricing settings", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const row = await prisma.pricingSetting.upsert({
    where: { id: "singleton" },
    update: parsed.data,
    create: { id: "singleton", ...DEFAULT_PRICING_SETTINGS, ...parsed.data },
  });
  return NextResponse.json(toPricingSettings(row));
}
