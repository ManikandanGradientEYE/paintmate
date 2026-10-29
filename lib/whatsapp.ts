import { formatINR } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import type { EstimateBreakdown, Paint, PricingSettings, Shade, Surface } from "@/types";

/** Paint Mate's WhatsApp number, country code first, digits only. */
export const WHATSAPP_NUMBER = "919815205058";

const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  hi: "Hindi",
  pa: "Punjabi",
};

export interface QuoteMessageInput {
  language: Language;
  name: string;
  locality: string;
  areaSqft: number;
  surface: Surface;
  coats: number;
  paint: Paint;
  shade: Shade | null;
  customShade: { brand: string; code: string; note: string };
  addOns: { putty: boolean; primer: boolean };
  estimate: EstimateBreakdown;
  settings: PricingSettings;
}

/** The quote as a WhatsApp message. Always English, whatever the site language, since
 * staff read it; the customer's language is noted so they can reply in it. */
export function buildQuoteMessage(q: QuoteMessageInput): string {
  const { estimate: e } = q;
  const customShade = [q.customShade.brand, q.customShade.code, q.customShade.note]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" — ");

  const lines = [
    "Hi Paint Mate — I'd like a quote.",
    "",
    `Name: ${q.name.trim()}`,
    ...(q.locality.trim() ? [`Locality: ${q.locality.trim()}`] : []),
    `Language: ${LANGUAGE_NAMES[q.language]}`,
    `Area: ${q.areaSqft} sq ft (${q.surface})`,
    `Product: ${q.paint.name} (${q.paint.brand}), ${q.coats} coat${q.coats === 1 ? "" : "s"}`,
    ...(q.shade ? [`Shade: ${q.shade.code} (${q.shade.hex.toUpperCase()})`] : []),
    ...(customShade ? [`Other-brand shade: ${customShade}`] : []),
    q.addOns.putty
      ? `Wall putty: ${e.puttyBags} bag${e.puttyBags === 1 ? "" : "s"} / ${
          e.puttyBags * q.settings.puttyBagKg
        } kg — ${formatINR(e.puttyCost)} incl. GST`
      : "Wall putty: no",
    `Primer: ${q.addOns.primer ? "yes" : "no"}`,
    ...(e.painterCount > 0
      ? [`Painters: ${e.painterCount} — ${formatINR(e.painterCost)}`]
      : []),
    "",
    `Paint + primer subtotal: ${formatINR(e.paintPrimerSubtotal)}`,
    `GST (${Math.round(q.settings.gstRate * 100)}%) on paint + primer: ${formatINR(e.gst)}`,
    `Delivery: ${
      e.deliveryFee === null
        ? "to be confirmed"
        : e.deliveryFee === 0
          ? "free"
          : formatINR(e.deliveryFee)
    }`,
    `Estimated total: ${formatINR(e.total)} (range ${formatINR(e.rangeLow)}–${formatINR(
      e.rangeHigh
    )})`,
    "",
    "Note: First order 5% off, second order 10% off. Final discount to be confirmed on WhatsApp.",
    "Please confirm and arrange same/2-day delivery.",
  ];
  return lines.join("\n");
}

export function whatsAppUrl(message: string): string {
  const params = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message,
    type: "phone_number",
    app_absent: "0",
  });
  return `https://api.whatsapp.com/send/?${params}`;
}
