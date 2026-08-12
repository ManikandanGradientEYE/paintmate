import type {
  AddOn as AddOnRow,
  CatalogProduct as CatalogProductRow,
  HomeSize as HomeSizeRow,
  Lead as LeadRow,
  Paint as PaintRow,
  PricingSetting as PricingSettingRow,
  Shade as ShadeRow,
} from "@prisma/client";
import {
  AddOnDef,
  AddOnSlug,
  CatalogProduct,
  HomeSize,
  Lead,
  LeadStatus,
  Paint,
  PricingSettings,
  Shade,
  ShadeCategory,
  Surface,
  Tier,
} from "@/types";

export function toHomeSize(row: HomeSizeRow): HomeSize {
  return {
    id: row.id,
    label: row.label,
    sublabel: row.sublabel,
    sqft: row.sqft,
    sortOrder: row.sortOrder,
  };
}

export function toPaint(row: PaintRow): Paint {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    pricePerLitre: row.pricePerLitre,
    tier: row.tier as Tier,
    recommended: row.recommended,
    isJiwan: row.isJiwan,
    approxPrice: row.approxPrice,
    surfaces: row.surfaces.split(",").filter(Boolean) as Surface[],
    whyPick: row.whyPick,
    sortOrder: row.sortOrder,
  };
}

export function surfacesToDb(surfaces: Surface[]): string {
  return surfaces.join(",");
}

export function toShade(row: ShadeRow): Shade {
  return {
    id: row.id,
    code: row.code,
    hex: row.hex,
    category: row.category as ShadeCategory,
    sortOrder: row.sortOrder,
  };
}

export function toAddOn(row: AddOnRow): AddOnDef {
  return {
    id: row.id,
    slug: row.slug as AddOnSlug,
    label: row.label,
    defaultOn: row.defaultOn,
    priced: row.priced,
    sortOrder: row.sortOrder,
  };
}

export function toCatalogProduct(row: CatalogProductRow): CatalogProduct {
  return {
    id: row.id,
    categoryLabel: row.categoryLabel,
    name: row.name,
    description: row.description,
    swatch: row.swatch,
    cta: row.cta as "add" | "ask",
    sortOrder: row.sortOrder,
  };
}

export function toPricingSettings(row: PricingSettingRow): PricingSettings {
  return {
    paintCoverageSqftPerLitrePerCoat: row.paintCoverageSqftPerLitrePerCoat,
    primerCoverageSqftPerLitre: row.primerCoverageSqftPerLitre,
    primerPriceInterior: row.primerPriceInterior,
    primerPriceExterior: row.primerPriceExterior,
    gstRate: row.gstRate,
    deliveryFeeLudhiana: row.deliveryFeeLudhiana,
    estimateRangePct: row.estimateRangePct,
    puttyBagKg: row.puttyBagKg,
    puttyPricePerBag: row.puttyPricePerBag,
    puttyCoverageSqftPerKg: row.puttyCoverageSqftPerKg,
  };
}

export function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    locality: row.locality,
    homeSizeLabel: row.homeSizeLabel,
    areaSqft: row.areaSqft,
    surface: row.surface as Surface,
    coats: row.coats,
    paintName: row.paintName,
    paintBrand: row.paintBrand,
    paintPricePerLitre: row.paintPricePerLitre,
    addOnPutty: row.addOnPutty,
    addOnPrimer: row.addOnPrimer,
    addOnPainter: row.addOnPainter,
    shadeCode: row.shadeCode,
    estimateTotal: row.estimateTotal,
    estimateRangeLow: row.estimateRangeLow,
    estimateRangeHigh: row.estimateRangeHigh,
    status: row.status as LeadStatus,
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
