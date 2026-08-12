"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { PricingSettings } from "@/types";

const FIELDS: { key: keyof PricingSettings; label: string; help: string; step?: number }[] = [
  {
    key: "paintCoverageSqftPerLitrePerCoat",
    label: "Paint coverage (sq ft / litre / coat)",
    help: "How much wall area one litre of paint covers per coat.",
  },
  {
    key: "primerCoverageSqftPerLitre",
    label: "Primer coverage (sq ft / litre)",
    help: "Primer is always calculated as a single coat.",
  },
  { key: "primerPriceInterior", label: "Interior primer price (₹/L)", help: "" },
  { key: "primerPriceExterior", label: "Exterior primer price (₹/L)", help: "" },
  {
    key: "gstRate",
    label: "GST rate",
    help: "As a fraction, e.g. 0.18 for 18%.",
    step: 0.01,
  },
  { key: "deliveryFeeLudhiana", label: "Delivery fee within Ludhiana (₹)", help: "" },
  {
    key: "estimateRangePct",
    label: "Estimate range (± fraction)",
    help: "e.g. 0.06 shows a ±6% range around the total.",
    step: 0.01,
  },
  { key: "puttyBagKg", label: "Putty bag size (kg)", help: "" },
  { key: "puttyPricePerBag", label: "Putty price per bag (₹, incl. GST)", help: "" },
  { key: "puttyCoverageSqftPerKg", label: "Putty coverage (sq ft / kg)", help: "" },
];

export default function PricingEditor({ initial }: { initial: PricingSettings }) {
  const [draft, setDraft] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setStatus("saving");
    setError(null);
    const result = await adminFetch<PricingSettings>("/api/admin/pricing", {
      method: "PATCH",
      body: JSON.stringify(draft),
    });
    if (!result.ok) {
      setStatus("error");
      setError(result.error);
      return;
    }
    setDraft(result.data);
    setStatus("saved");
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-line bg-white p-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-bold text-ink-muted">{field.label}</label>
            <input
              type="number"
              step={field.step ?? 0.01}
              value={draft[field.key]}
              onChange={(e) =>
                setDraft({ ...draft, [field.key]: Number(e.target.value) })
              }
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
            />
            {field.help && <p className="mt-1 text-xs text-ink-faint">{field.help}</p>}
          </div>
        ))}
      </div>

      {error && <p className="mt-3 text-sm font-semibold text-brand-pink">{error}</p>}
      {status === "saved" && (
        <p className="mt-3 text-sm font-semibold text-forest">Saved.</p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={status === "saving"}
        className="mt-4 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        {status === "saving" ? "Saving..." : "Save pricing"}
      </button>
    </div>
  );
}
