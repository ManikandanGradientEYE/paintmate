import { prisma } from "@/lib/prisma";
import {
  toAddOn,
  toCatalogProduct,
  toHomeSize,
  toPaint,
  toPricingSettings,
  toShade,
} from "@/lib/mappers";
import { DEFAULT_PRICING_SETTINGS } from "@/lib/pricing";
import { SiteData } from "@/types";
import { QuoteProvider } from "@/context/QuoteContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CalculatorSection from "@/components/calculator/CalculatorSection";
import PaintSection from "@/components/paint/PaintSection";
import ShadeSection from "@/components/shades/ShadeSection";
import EstimateCard from "@/components/estimate/EstimateCard";
import LocationSection from "@/components/location/LocationSection";
import MoreProducts from "@/components/catalog/MoreProducts";
import JiwanStory from "@/components/JiwanStory";
import Footer from "@/components/Footer";
import StickyBar from "@/components/estimate/StickyBar";

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
    catalogProducts: catalogRows.map(toCatalogProduct),
    pricingSettings: pricingRow ? toPricingSettings(pricingRow) : DEFAULT_PRICING_SETTINGS,
  };
}

export default async function Home() {
  const siteData = await loadSiteData();

  return (
    <QuoteProvider siteData={siteData}>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-6 md:px-6 lg:max-w-6xl">
        <Hero />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="flex flex-col gap-6">
            <CalculatorSection />
            <PaintSection />
            <ShadeSection />
          </div>
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="hidden lg:block">
              <EstimateCard />
            </div>
            <LocationSection />
          </div>
        </div>
        <MoreProducts products={siteData.catalogProducts} />
        <JiwanStory />
        <Footer />
      </main>
      <StickyBar />
    </QuoteProvider>
  );
}
