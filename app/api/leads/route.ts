import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateEstimate } from "@/lib/pricing";
import { toPricingSettings } from "@/lib/mappers";
import { isLudhianaLocality } from "@/lib/format";
import { leadSubmissionSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = leadSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const input = parsed.data;

  const [paint, pricingRow] = await Promise.all([
    prisma.paint.findUnique({ where: { id: input.paintId } }),
    prisma.pricingSetting.findUnique({ where: { id: "singleton" } }),
  ]);

  if (!paint) {
    return NextResponse.json({ error: "Selected paint not found" }, { status: 400 });
  }
  if (!pricingRow) {
    return NextResponse.json({ error: "Pricing is not configured yet" }, { status: 500 });
  }

  const settings = toPricingSettings(pricingRow);
  const isInLudhiana = isLudhianaLocality(input.locality);

  const estimate = calculateEstimate({
    areaSqft: input.areaSqft,
    coats: input.coats,
    paint: { pricePerLitre: paint.pricePerLitre },
    surface: input.surface,
    addOns: { putty: input.addOns.putty, primer: input.addOns.primer },
    isInLudhiana,
    settings,
  });

  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      phone: input.phone,
      locality: input.locality || null,
      homeSizeLabel: input.homeSizeLabel ?? null,
      areaSqft: input.areaSqft,
      surface: input.surface,
      coats: input.coats,
      paintName: paint.name,
      paintBrand: paint.brand,
      paintPricePerLitre: paint.pricePerLitre,
      addOnPutty: input.addOns.putty,
      addOnPrimer: input.addOns.primer,
      addOnPainter: input.addOns.painter,
      shadeCode: input.shadeCode ?? null,
      estimateTotal: estimate.total,
      estimateRangeLow: estimate.rangeLow,
      estimateRangeHigh: estimate.rangeHigh,
    },
  });

  return NextResponse.json({ ok: true, leadId: lead.id, estimate }, { status: 201 });
}
