import { prisma } from "@/lib/prisma";
import { toPricingSettings } from "@/lib/mappers";
import { DEFAULT_PRICING_SETTINGS } from "@/lib/pricing";
import PricingEditor from "@/components/admin/PricingEditor";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const row = await prisma.pricingSetting.findUnique({ where: { id: "singleton" } });
  const settings = row ? toPricingSettings(row) : DEFAULT_PRICING_SETTINGS;
  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Pricing</h1>
      <p className="mt-1 text-sm text-ink-muted">
        The coverage rates, GST, delivery fee and putty pricing behind every estimate.
      </p>
      <PricingEditor initial={settings} />
    </div>
  );
}
