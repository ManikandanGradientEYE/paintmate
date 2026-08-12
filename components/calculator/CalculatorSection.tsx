"use client";

import Card from "@/components/ui/Card";
import { useQuote } from "@/context/QuoteContext";
import { Coats, Surface } from "@/types";

const COATS: Coats[] = [1, 2, 3];
const MIN_AREA_SQFT = 200;
const MAX_AREA_SQFT = 8000;

export default function CalculatorSection() {
  const { state, dispatch, homeSizes } = useQuote();

  return (
    <Card>
      <h2 className="text-base font-bold text-ink">What size is your home?</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {homeSizes.map((size) => {
          const active = state.homeSizeId === size.id;
          return (
            <button
              key={size.id}
              type="button"
              onClick={() => dispatch({ type: "SET_HOME_SIZE", id: size.id })}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                active
                  ? "border-forest bg-forest/5"
                  : "border-line bg-white hover:border-ink-faint"
              }`}
            >
              <p className="text-sm font-bold text-ink">{size.label}</p>
              <p className="mt-0.5 text-xs text-ink-faint">{size.sublabel}</p>
            </button>
          );
        })}
      </div>

      <h3 className="mt-6 text-sm font-bold text-ink">Or set the exact wall area</h3>
      <div className="mt-3 flex items-center gap-4">
        <input
          type="range"
          min={MIN_AREA_SQFT}
          max={MAX_AREA_SQFT}
          step={50}
          value={state.areaSqft}
          onChange={(e) => dispatch({ type: "SET_AREA", sqft: Number(e.target.value) })}
          className="w-full"
          aria-label="Wall area in square feet"
        />
        <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-3 py-2">
          <input
            type="number"
            min={MIN_AREA_SQFT}
            max={MAX_AREA_SQFT}
            value={state.areaSqft}
            onChange={(e) =>
              dispatch({
                type: "SET_AREA",
                sqft: Math.max(MIN_AREA_SQFT, Math.min(MAX_AREA_SQFT, Number(e.target.value) || 0)),
              })
            }
            className="w-16 text-right text-sm font-bold text-ink outline-none"
          />
          <span className="text-sm text-ink-muted">sq ft</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h3 className="text-sm font-bold text-ink">Surface</h3>
          <div className="mt-3 flex gap-2">
            {(["interior", "exterior"] as Surface[]).map((surface) => {
              const active = state.surface === surface;
              return (
                <button
                  key={surface}
                  type="button"
                  onClick={() => dispatch({ type: "SET_SURFACE", surface })}
                  className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                    active ? "bg-forest text-white" : "bg-tan text-ink"
                  }`}
                >
                  {surface}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-ink">Coats</h3>
          <div className="mt-3 flex gap-2">
            {COATS.map((coats) => {
              const active = state.coats === coats;
              return (
                <button
                  key={coats}
                  type="button"
                  onClick={() => dispatch({ type: "SET_COATS", coats })}
                  className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
                    active ? "bg-forest text-white" : "bg-tan text-ink"
                  }`}
                >
                  {coats}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
