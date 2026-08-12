"use client";

import Card from "@/components/ui/Card";
import { useQuote } from "@/context/QuoteContext";
import { readableTextColor } from "@/lib/color";
import { ShadeCategory } from "@/types";

const CATEGORIES: { id: ShadeCategory; label: string; dot: string }[] = [
  { id: "greens", label: "Greens", dot: "#8FA23A" },
  { id: "browns", label: "Browns", dot: "#8F7359" },
  { id: "greys", label: "Greys", dot: "#7C8288" },
];

export default function ShadeSection() {
  const { state, dispatch, shades: allShades } = useQuote();
  const shades = allShades.filter((s) => s.category === state.shadeCategory);

  return (
    <Card>
      <h2 className="text-base font-bold text-ink">Pick a shade</h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const active = state.shadeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => dispatch({ type: "SET_SHADE_CATEGORY", category: cat.id })}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                active ? "border-forest text-forest" : "border-line text-ink-muted"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: cat.dot }}
              />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="scrollbar-thin mt-4 grid max-h-72 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
        {shades.map((shade) => {
          const active = state.selectedShadeCode === shade.code;
          return (
            <button
              key={shade.id}
              type="button"
              onClick={() => dispatch({ type: "SET_SHADE", code: shade.code })}
              className={`flex h-20 flex-col justify-end rounded-lg p-2 text-left ring-2 transition ${
                active ? "ring-forest" : "ring-transparent hover:ring-ink-faint"
              }`}
              style={{ backgroundColor: shade.hex }}
            >
              <span
                className="text-[11px] font-bold"
                style={{ color: readableTextColor(shade.hex) }}
              >
                {shade.code}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-ink-faint">
        {allShades.length} shades · Custom shade matching usually ready in approx. 2
        days.
      </p>

      <div className="mt-3 border-t border-line pt-3">
        <button type="button" className="text-sm font-semibold text-brand-pink">
          + Have a shade from another shade card?
        </button>
      </div>
    </Card>
  );
}
