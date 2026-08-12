"use client";

import { useQuote } from "@/context/QuoteContext";

export default function AddOns() {
  const { state, dispatch, addOns } = useQuote();

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {addOns.map((addOn) => {
        const on = state.addOns[addOn.slug];
        return (
          <button
            key={addOn.id}
            type="button"
            onClick={() => dispatch({ type: "TOGGLE_ADDON", id: addOn.slug })}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              on ? "bg-forest text-white" : "bg-tan text-ink-muted"
            }`}
          >
            {on ? "✓ " : "+ "}
            {addOn.label}
          </button>
        );
      })}
    </div>
  );
}
