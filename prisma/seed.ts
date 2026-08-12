import { PrismaClient } from "@prisma/client";
import { homeSizes } from "../data/homeSizes";
import { allPaints } from "../data/paints";
import { shades } from "../data/shades";
import { addOnDefs } from "../data/addOns";
import { catalogProducts } from "../data/catalog";
import { DEFAULT_PRICING_SETTINGS } from "../lib/pricing";

const prisma = new PrismaClient();

async function main() {
  await prisma.homeSize.deleteMany();
  await prisma.paint.deleteMany();
  await prisma.shade.deleteMany();
  await prisma.addOn.deleteMany();
  await prisma.catalogProduct.deleteMany();

  await prisma.homeSize.createMany({
    data: homeSizes.map((h, i) => ({
      id: h.id,
      label: h.label,
      sublabel: h.sublabel,
      sqft: h.sqft,
      sortOrder: i,
    })),
  });

  await prisma.paint.createMany({
    data: allPaints.map((p, i) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      pricePerLitre: p.pricePerLitre,
      tier: p.tier,
      recommended: p.recommended,
      isJiwan: p.isJiwan,
      approxPrice: p.approxPrice ?? false,
      surfaces: p.surfaces.join(","),
      whyPick: p.whyPick ?? null,
      sortOrder: i,
    })),
  });

  await prisma.shade.createMany({
    data: shades.map((s, i) => ({
      code: s.code,
      hex: s.hex,
      category: s.category,
      sortOrder: i,
    })),
  });

  await prisma.addOn.createMany({
    data: addOnDefs.map((a, i) => ({
      slug: a.id,
      label: a.label,
      defaultOn: a.defaultOn,
      priced: a.priced,
      sortOrder: i,
    })),
  });

  await prisma.catalogProduct.createMany({
    data: catalogProducts.map((c, i) => ({
      id: c.id,
      categoryLabel: c.categoryLabel,
      name: c.name,
      description: c.description,
      swatch: c.swatch,
      cta: c.cta,
      sortOrder: i,
    })),
  });

  await prisma.pricingSetting.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", ...DEFAULT_PRICING_SETTINGS },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
