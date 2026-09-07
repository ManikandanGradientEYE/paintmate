import { prisma } from "@/lib/prisma";
import {
  toAddOn,
  toHomeSize,
  toPaint,
  toPricingSettings,
  toShade,
} from "@/lib/mappers";
import { DEFAULT_PRICING_SETTINGS } from "@/lib/pricing";
import { SiteData } from "@/types";
import { QuoteProvider } from "@/context/QuoteContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ShopHero from "@/components/shop/ShopHero";
import HomeSizeCard from "@/components/shop/HomeSizeCard";
import SurfaceCoatsCard from "@/components/shop/SurfaceCoatsCard";
import PaintPickerCard from "@/components/shop/PaintPickerCard";
import AddOnsCard from "@/components/shop/AddOnsCard";
import ShadesCard from "@/components/shop/ShadesCard";
import EstimateCard from "@/components/shop/EstimateCard";
import DeliveryCard from "@/components/shop/DeliveryCard";
import ShopStickyBar from "@/components/shop/ShopStickyBar";

export const dynamic = "force-dynamic";

async function loadSiteData(): Promise<SiteData> {
  const [homeSizeRows, paintRows, shadeRows, addOnRows, catalogRows, pricingRow] =
    await Promise.all([
      prisma.homeSize.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.paint.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.shade.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.addOn.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.catalogProduct.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.pricingSetting.findUnique({ where: { id: "singleton" } }),
    ]);

  return {
    homeSizes: homeSizeRows.map(toHomeSize),
    paints: paintRows.map(toPaint),
    shades: shadeRows.map(toShade),
    addOns: addOnRows.map(toAddOn),
    catalogProducts: catalogRows.map((row) => ({
      id: row.id,
      categoryLabel: row.categoryLabel,
      name: row.name,
      description: row.description,
      swatch: row.swatch,
      cta: row.cta as "add" | "ask",
      sortOrder: row.sortOrder,
    })),
    pricingSettings: pricingRow
      ? toPricingSettings(pricingRow)
      : DEFAULT_PRICING_SETTINGS,
  };
}

export default async function ShopPage() {
  const siteData = await loadSiteData();

  return (
    <QuoteProvider siteData={siteData}>
      <SiteHeader quoteButton="desktopOnly" quoteHref="#contact" />
      <main className="pb-[126px] lg:pb-0">
        <ShopHero />

        <div className="frame pad-x pt-[22px] lg:grid lg:grid-cols-[724px_1fr] lg:items-start lg:gap-x-[60px] lg:pt-[74px]">
          <div className="flex flex-col gap-[22px] lg:gap-[26px]">
            <HomeSizeCard />
            <SurfaceCoatsCard />
            <PaintPickerCard />
            <AddOnsCard />
            <ShadesCard />
          </div>

          <div className="mt-[22px] flex flex-col gap-[22px] lg:sticky lg:top-[120px] lg:mt-0 lg:gap-[26px]">
            <div className="hidden lg:block">
              <EstimateCard />
            </div>
            <DeliveryCard />
          </div>
        </div>
      </main>
      <SiteFooter />
      <ShopStickyBar />
    </QuoteProvider>
  );
}
