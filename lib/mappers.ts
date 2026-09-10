import type {
  AddOn as AddOnRow,
  CatalogProduct as CatalogProductRow,
  ColourSwatch as ColourSwatchRow,
  ColourRoom as ColourRoomRow,
  HomeSize as HomeSizeRow,
  Lead as LeadRow,
  Paint as PaintRow,
  PricingSetting as PricingSettingRow,
  Review as ReviewRow,
  Shade as ShadeRow,
  SocialLink as SocialLinkRow,
} from "@prisma/client";
import {
  AddOnDef,
  AddOnSlug,
  CatalogProduct,
  ColourRoom,
  HomeSize,
  Lead,
  LeadStatus,
  Paint,
  PricingSettings,
  Review,
  Shade,
  ShadeCategory,
  SocialLink,
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
    imageUrl: row.imageUrl,
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
    painterRatePerSqft: row.painterRatePerSqft,
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
    addOnPainterCount: row.addOnPainterCount,
    shadeCode: row.shadeCode,
    customShadeBrand: row.customShadeBrand,
    customShadeCode: row.customShadeCode,
    customShadeNote: row.customShadeNote,
    estimateTotal: row.estimateTotal,
    estimateRangeLow: row.estimateRangeLow,
    estimateRangeHigh: row.estimateRangeHigh,
    status: row.status as LeadStatus,
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toColourRoom(
  row: ColourRoomRow & { swatches: ColourSwatchRow[] }
): ColourRoom {
  return {
    id: row.id,
    name: row.name,
    imageUrl: row.imageUrl,
    sortOrder: row.sortOrder,
    swatches: row.swatches
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => ({ id: s.id, hex: s.hex, sortOrder: s.sortOrder })),
  };
}

export function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    body: row.body,
    name: row.name,
    role: row.role,
    sortOrder: row.sortOrder,
  };
}

export function toSocialLink(row: SocialLinkRow): SocialLink {
  return {
    id: row.id,
    platform: row.platform,
    url: row.url,
    sortOrder: row.sortOrder,
  };
}
