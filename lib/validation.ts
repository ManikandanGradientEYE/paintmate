import { z } from "zod";

export const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{7,20}$/, "Enter a valid contact number"),
  locality: z.string().trim().max(200).optional().default(""),
  homeSizeLabel: z.string().trim().max(60).nullable().optional(),
  areaSqft: z.number().int().min(50).max(50000),
  surface: z.enum(["interior", "exterior"]),
  coats: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  paintId: z.string().min(1),
  addOns: z.object({
    putty: z.boolean(),
    primer: z.boolean(),
    painter: z.boolean(),
  }),
  shadeCode: z.string().max(20).nullable().optional(),
});

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;

export const homeSizeSchema = z.object({
  label: z.string().trim().min(1).max(60),
  sublabel: z.string().trim().min(1).max(80),
  sqft: z.number().int().min(50).max(50000),
  sortOrder: z.number().int().optional().default(0),
});

export const paintSchema = z.object({
  name: z.string().trim().min(1).max(120),
  brand: z.string().trim().min(1).max(80),
  pricePerLitre: z.number().positive().max(100000),
  tier: z.enum(["Value", "Premium"]),
  recommended: z.boolean().default(false),
  isJiwan: z.boolean().default(false),
  approxPrice: z.boolean().default(false),
  surfaces: z.array(z.enum(["interior", "exterior"])).min(1),
  whyPick: z.string().trim().max(400).nullable().optional(),
  sortOrder: z.number().int().optional().default(0),
});

export const shadeSchema = z.object({
  code: z.string().trim().min(1).max(20),
  hex: z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/, "Use a hex colour like #8FA23A"),
  category: z.enum(["greens", "browns", "greys"]),
  sortOrder: z.number().int().optional().default(0),
});

export const addOnUpdateSchema = z.object({
  label: z.string().trim().min(1).max(80).optional(),
  defaultOn: z.boolean().optional(),
  priced: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const catalogProductSchema = z.object({
  categoryLabel: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(300),
  swatch: z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/, "Use a hex colour like #1F3D24"),
  cta: z.enum(["add", "ask"]),
  sortOrder: z.number().int().optional().default(0),
});

export const pricingSettingsSchema = z.object({
  paintCoverageSqftPerLitrePerCoat: z.number().positive().max(1000),
  primerCoverageSqftPerLitre: z.number().positive().max(1000),
  primerPriceInterior: z.number().positive().max(10000),
  primerPriceExterior: z.number().positive().max(10000),
  gstRate: z.number().min(0).max(1),
  deliveryFeeLudhiana: z.number().min(0).max(100000),
  estimateRangePct: z.number().min(0).max(1),
  puttyBagKg: z.number().positive().max(1000),
  puttyPricePerBag: z.number().positive().max(100000),
  puttyCoverageSqftPerKg: z.number().positive().max(1000),
});

export const leadUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]).optional(),
  notes: z.string().trim().max(2000).nullable().optional(),
});
