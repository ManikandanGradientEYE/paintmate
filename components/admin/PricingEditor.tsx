"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { PricingSettings } from "@/types";

interface FieldDef {
  key: keyof PricingSettings;
  label: string;
  help?: string;
  step?: number;
  suffix?: string;
}

interface GroupDef {
  title: string;
  description?: string;
  fields: FieldDef[];
}

const GROUPS: GroupDef[] = [
  {
    title: "Paint",
    description: "How far the selected paint stretches.",
    fields: [
      {
        key: "paintCoverageSqftPerLitrePerCoat",
        label: "Paint coverage",
        help: "How much wall area one litre covers, per coat.",
        suffix: "sq ft / L / coat",
      },
    ],
  },
  {
    title: "Primer",
    description: "Primer is always calculated as a single coat.",
    fields: [
      {
        key: "primerCoverageSqftPerLitre",
        label: "Primer coverage",
        suffix: "sq ft / L",
      },
      {
        key: "primerPriceInterior",
        label: "Interior primer price",
        suffix: "₹ / L",
      },
      {
        key: "primerPriceExterior",
        label: "Exterior primer price",
        suffix: "₹ / L",
      },
    ],
  },
  {
    title: "Wall putty",
    description: "Used when the Wall putty add-on is selected.",
    fields: [
      {
        key: "puttyCoverageSqftPerKg",
        label: "Putty coverage",
        suffix: "sq ft / kg",
      },
      { key: "puttyBagKg", label: "Bag size", suffix: "kg / bag" },
      {
        key: "puttyPricePerBag",
        label: "Price per bag",
        help: "Incl. GST.",
        suffix: "₹ / bag",
      },
    ],
  },
  {
    title: "Tax & delivery",
    fields: [
      {
        key: "gstRate",
        label: "GST rate",
        help: "As a fraction, e.g. 0.18 for 18%.",
        step: 0.01,
      },
      {
        key: "deliveryFeeLudhiana",
        label: "Delivery fee within Ludhiana",
        suffix: "₹",
      },
    ],
  },
  {
    title: "Estimate display",
    fields: [
      {
        key: "estimateRangePct",
        label: "Estimate range",
        help: "e.g. 0.06 shows a ±6% range around the total.",
        step: 0.01,
      },
    ],
  },
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
    <div className="mt-6 flex flex-col gap-4">
      {GROUPS.map((group) => (
        <div key={group.title} className="rounded-2xl border border-line bg-white p-5">
          <h2 className="text-sm font-bold text-ink">{group.title}</h2>
          {group.description && (
            <p className="mt-0.5 text-xs text-ink-faint">{group.description}</p>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {group.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-bold text-ink-muted">
                  {field.label}
                  {field.suffix && (
                    <span className="font-normal text-ink-faint"> ({field.suffix})</span>
                  )}
                </label>
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
        </div>
      ))}

      {error && <p className="text-sm font-semibold text-brand-pink">{error}</p>}
      {status === "saved" && (
        <p className="text-sm font-semibold text-forest">Saved.</p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={status === "saving"}
        className="self-start rounded-full bg-forest px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        {status === "saving" ? "Saving..." : "Save pricing"}
      </button>
    </div>
  );
}
