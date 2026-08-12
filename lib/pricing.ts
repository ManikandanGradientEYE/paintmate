import { Coats, EstimateBreakdown, PaintLike, PricingSettings, Surface } from "@/types";

// Defaults calibrated from Jiwan Paints' own worked example:
// 1000 sq ft, 2 coats of SuperFinish (Rs 225/L) => 15 L, Rs 3,375.
// 1000 sq ft, 1 coat of primer => 8 L.
// These are seeded into PricingSetting and editable from /admin/pricing.
export const DEFAULT_PRICING_SETTINGS: PricingSettings = {
  paintCoverageSqftPerLitrePerCoat: 2000 / 15,
  primerCoverageSqftPerLitre: 125,
  primerPriceInterior: 70,
  primerPriceExterior: 85,
  gstRate: 0.18,
  deliveryFeeLudhiana: 99,
  estimateRangePct: 0.06,
  puttyBagKg: 30,
  puttyPricePerBag: 515,
  puttyCoverageSqftPerKg: 1000 / 90,
};

export function primerPriceFor(settings: PricingSettings, surface: Surface): number {
  return surface === "interior"
    ? settings.primerPriceInterior
    : settings.primerPriceExterior;
}

interface CalculateEstimateInput {
  areaSqft: number;
  coats: Coats;
  paint: PaintLike;
  surface: Surface;
  addOns: { putty: boolean; primer: boolean };
  isInLudhiana: boolean;
  settings: PricingSettings;
}

export function calculateEstimate({
  areaSqft,
  coats,
  paint,
  surface,
  addOns,
  isInLudhiana,
  settings,
}: CalculateEstimateInput): EstimateBreakdown {
  const primerPricePerLitre = primerPriceFor(settings, surface);

  const primerLitres = addOns.primer
    ? Math.max(1, Math.round(areaSqft / settings.primerCoverageSqftPerLitre))
    : 0;
  const primerCost = primerLitres * primerPricePerLitre;

  const paintLitres = Math.max(
    1,
    Math.round((areaSqft * coats) / settings.paintCoverageSqftPerLitrePerCoat)
  );
  const paintCost = paintLitres * paint.pricePerLitre;

  const paintPrimerSubtotal = primerCost + paintCost;
  const gst = Math.round(paintPrimerSubtotal * settings.gstRate);

  const puttyKg = addOns.putty ? areaSqft / settings.puttyCoverageSqftPerKg : 0;
  const puttyBags = addOns.putty
    ? Math.max(1, Math.ceil(puttyKg / settings.puttyBagKg))
    : 0;
  const puttyCost = puttyBags * settings.puttyPricePerBag;

  const deliveryFee = isInLudhiana ? settings.deliveryFeeLudhiana : null;

  const total = paintCost + primerCost + gst + puttyCost + (deliveryFee ?? 0);
  const rangeLow = Math.round(total * (1 - settings.estimateRangePct));
  const rangeHigh = Math.round(total * (1 + settings.estimateRangePct));

  return {
    primerLitres,
    primerPricePerLitre,
    primerCost,
    paintLitres,
    paintCost,
    paintPrimerSubtotal,
    gst,
    puttyBags,
    puttyKg,
    puttyCost,
    deliveryFee,
    total,
    rangeLow,
    rangeHigh,
  };
}
