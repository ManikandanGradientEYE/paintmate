export type Surface = "interior" | "exterior";
export type Tier = "Value" | "Premium";
export type Coats = 1 | 2 | 3;
export type ShadeCategory = "greens" | "browns" | "greys";
export type AddOnSlug = "putty" | "primer" | "painter";
export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export interface HomeSize {
  id: string;
  label: string;
  sublabel: string;
  sqft: number;
  sortOrder: number;
}

export interface Paint {
  id: string;
  name: string;
  brand: string;
  pricePerLitre: number;
  tier: Tier;
  recommended: boolean;
  isJiwan: boolean;
  approxPrice: boolean;
  surfaces: Surface[];
  whyPick: string | null;
  sortOrder: number;
}

export interface PaintLike {
  pricePerLitre: number;
}

export interface Shade {
  id: string;
  code: string;
  hex: string;
  category: ShadeCategory;
  sortOrder: number;
}

export interface AddOnDef {
  id: string;
  slug: AddOnSlug;
  label: string;
  defaultOn: boolean;
  priced: boolean;
  sortOrder: number;
}

export interface CatalogProduct {
  id: string;
  categoryLabel: string;
  name: string;
  description: string;
  swatch: string;
  cta: "add" | "ask";
  sortOrder: number;
}

export interface PricingSettings {
  paintCoverageSqftPerLitrePerCoat: number;
  primerCoverageSqftPerLitre: number;
  primerPriceInterior: number;
  primerPriceExterior: number;
  gstRate: number;
  deliveryFeeLudhiana: number;
  estimateRangePct: number;
  puttyBagKg: number;
  puttyPricePerBag: number;
  puttyCoverageSqftPerKg: number;
}

export interface EstimateBreakdown {
  primerLitres: number;
  primerPricePerLitre: number;
  primerCost: number;
  paintLitres: number;
  paintCost: number;
  paintPrimerSubtotal: number;
  gst: number;
  puttyBags: number;
  puttyKg: number;
  puttyCost: number;
  deliveryFee: number | null;
  total: number;
  rangeLow: number;
  rangeHigh: number;
}

export interface SiteData {
  homeSizes: HomeSize[];
  paints: Paint[];
  shades: Shade[];
  addOns: AddOnDef[];
  catalogProducts: CatalogProduct[];
  pricingSettings: PricingSettings;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  locality: string | null;
  homeSizeLabel: string | null;
  areaSqft: number;
  surface: Surface;
  coats: number;
  paintName: string;
  paintBrand: string;
  paintPricePerLitre: number;
  addOnPutty: boolean;
  addOnPrimer: boolean;
  addOnPainter: boolean;
  shadeCode: string | null;
  estimateTotal: number;
  estimateRangeLow: number;
  estimateRangeHigh: number;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadSubmission {
  name: string;
  phone: string;
  locality: string;
  homeSizeLabel: string | null;
  areaSqft: number;
  surface: Surface;
  coats: Coats;
  paintId: string;
  addOns: { putty: boolean; primer: boolean; painter: boolean };
  shadeCode: string | null;
}
