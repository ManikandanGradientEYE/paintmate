// Seed data only — loaded into the database once by prisma/seed.ts.
// Live data is edited from /admin/paints after that.
interface SeedPaint {
  id: string;
  name: string;
  brand: string;
  pricePerLitre: number;
  tier: "Value" | "Premium";
  recommended: boolean;
  isJiwan: boolean;
  approxPrice?: boolean;
  surfaces: ("interior" | "exterior")[];
  whyPick?: string;
}

export const jiwanPaints: SeedPaint[] = [
  {
    id: "superfinish-interior",
    name: "SuperFinish Interior Emulsion",
    brand: "Jiwan Paints",
    pricePerLitre: 225,
    tier: "Premium",
    recommended: true,
    isJiwan: true,
    surfaces: ["interior"],
    whyPick:
      "Soft-sheen, stain-cleanable luxury finish. Bespoke shades matched with X-Rite technology.",
  },
  {
    id: "hallmark-interior",
    name: "Hallmark Interior Emulsion",
    brand: "Jiwan Paints",
    pricePerLitre: 113,
    tier: "Value",
    recommended: true,
    isJiwan: true,
    surfaces: ["interior"],
    whyPick:
      "Bright, smooth coverage that keeps the budget in check without skimping on finish.",
  },
  {
    id: "weathertough-exterior",
    name: "WeatherTough Exterior Emulsion",
    brand: "Jiwan Paints",
    pricePerLitre: 265,
    tier: "Premium",
    recommended: true,
    isJiwan: true,
    surfaces: ["exterior"],
    whyPick:
      "Rain-repelling, UV-tough exterior finish built for Ludhiana's summers and monsoons.",
  },
  {
    id: "hallmark-exterior",
    name: "Hallmark Exterior Emulsion",
    brand: "Jiwan Paints",
    pricePerLitre: 128,
    tier: "Value",
    recommended: true,
    isJiwan: true,
    surfaces: ["exterior"],
    whyPick: "Crack-resistant matt exterior finish at an everyday price.",
  },
  {
    id: "jse-synthetic-enamel",
    name: "JSE Synthetic Enamel",
    brand: "Jiwan Paints",
    pricePerLitre: 285,
    tier: "Premium",
    recommended: true,
    isJiwan: true,
    surfaces: ["interior", "exterior"],
    whyPick: "Hard-wearing gloss finish for metal & wood — grilles, doors and railings.",
  },
];

export const otherBrandPaints: SeedPaint[] = [
  {
    id: "tractor-emulsion",
    name: "Tractor Emulsion",
    brand: "Asian Paints",
    pricePerLitre: 209,
    tier: "Value",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "royale-luxury-emulsion",
    name: "Royale Luxury Emulsion",
    brand: "Asian Paints",
    pricePerLitre: 420,
    tier: "Premium",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "bison-glow-emulsion",
    name: "Bison Glow Emulsion",
    brand: "Berger",
    pricePerLitre: 195,
    tier: "Value",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "silk-glamour",
    name: "Silk Glamour",
    brand: "Berger",
    pricePerLitre: 440,
    tier: "Premium",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "beauty-gold-emulsion",
    name: "Beauty Gold Emulsion",
    brand: "Nerolac",
    pricePerLitre: 185,
    tier: "Value",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "impressions-hd",
    name: "Impressions HD",
    brand: "Nerolac",
    pricePerLitre: 400,
    tier: "Premium",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "halo-interior",
    name: "Halo Interior",
    brand: "JSW Paints",
    pricePerLitre: 160,
    tier: "Value",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "one-true-look",
    name: "One True Look",
    brand: "Birla Opus",
    pricePerLitre: 430,
    tier: "Premium",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
  {
    id: "style-colour-smart",
    name: "Style Colour Smart",
    brand: "Birla Opus",
    pricePerLitre: 185,
    tier: "Value",
    recommended: false,
    isJiwan: false,
    approxPrice: true,
    surfaces: ["interior"],
  },
];

export const allPaints = [...jiwanPaints, ...otherBrandPaints];
