"use client";

import { useState } from "react";
import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";
import { readableTextColor } from "@/lib/color";

/** A representative dot colour for a category tab, taken from its first shade. */
function categoryDot(hexes: string[]): string {
  return hexes[0] ?? "#DDD";
}

export default function ShadesCard() {
  const { state, dispatch, shades, visibleShades, shadeCategories } = useQuote();
  const { t } = useLanguage();
  const [customOpen, setCustomOpen] = useState(true);

  return (
    <section className="pm-card">
      <h2 className="display mb-[18px] text-[21px] lg:mb-[22px] lg:text-[26px]">
        {t.shadeHeading}
      </h2>

      <div className="hscroll -mx-1 px-1 pb-1.5 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
        <button
          type="button"
          role="tab"
          aria-selected={state.shadeCategory === null}
          onClick={() => dispatch({ type: "SET_SHADE_CATEGORY", category: null })}
          className={`rounded-pill border px-4 py-2 text-sm font-semibold uppercase transition ${
            state.shadeCategory === null
              ? "border-forest bg-pale text-forest"
              : "border-line text-ink-muted"
          }`}
        >
          {t.shadeAll}
        </button>

        {shadeCategories.map((cat) => {
          const active = state.shadeCategory === cat;
          const dot = categoryDot(
            shades.filter((s) => s.category === cat).map((s) => s.hex)
          );
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => dispatch({ type: "SET_SHADE_CATEGORY", category: cat })}
              className={`flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-semibold capitalize transition ${
                active ? "border-forest bg-pale text-forest" : "border-line text-ink-muted"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: dot }}
              />
              {cat}
            </button>
          );
        })}
      </div>

      <div className="thin-scroll mt-[18px] max-h-[300px] overflow-y-auto rounded-xl bg-cream p-4 lg:max-h-[390px] lg:p-[22px]">
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-5">
          {visibleShades.map((shade) => {
            const active = state.selectedShadeCode === shade.code;
            return (
              <button
                key={shade.id}
                type="button"
                aria-pressed={active}
                onClick={() => dispatch({ type: "SET_SHADE", code: shade.code })}
                className={`flex items-end rounded-[10px] border-2 px-2.5 py-2 text-[12.5px] font-bold [aspect-ratio:1/.86] lg:rounded-xl lg:text-[13px] ${
                  active ? "border-forest" : "border-transparent"
                }`}
                style={{
                  background: shade.hex,
                  color: readableTextColor(shade.hex),
                }}
              >
                {shade.code}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-[1.45] text-[#333] lg:text-[15px]">
        {t.shadeCountLabel(shades.length)} · {t.shadeCustomMatching}
      </p>

      {/* custom shade from another brand */}
      <div className="mt-[26px]">
        <button
          type="button"
          onClick={() => setCustomOpen((v) => !v)}
          aria-expanded={customOpen}
          className="flex w-full items-center justify-between gap-3 border-b-[1.5px] border-forest pb-3 text-left"
        >
          <h3 className="display m-0 text-[19px] text-lime lg:text-[26px]">
            {t.customShadeTitle}
          </h3>
          <span className="text-[22px] font-bold leading-none text-forest">
            {customOpen ? "–" : "+"}
          </span>
        </button>

        {customOpen && (
          <>
            {(
              [
                ["brand", t.customShadeBrandPlaceholder],
                ["code", t.customShadeCodePlaceholder],
                ["note", t.customShadeNotePlaceholder],
              ] as const
            ).map(([field, placeholder]) => (
              <input
                key={field}
                type="text"
                value={state.customShade[field]}
                onChange={(e) =>
                  dispatch({
                    type: "SET_CUSTOM_SHADE",
                    field,
                    value: e.target.value,
                  })
                }
                placeholder={placeholder}
                className="mt-3.5 w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-3.5 text-[15.5px] font-bold text-ink outline-none placeholder:text-[#A6A6A6] focus:border-lime lg:px-5 lg:py-[17px] lg:text-[17px]"
              />
            ))}

            <p className="mt-4 text-[13.5px] leading-[1.45] text-[#333] lg:text-[15px]">
              {t.customShadeHelp}
            </p>
          </>
        )}

        <div className="mt-6 flex items-center gap-3.5 rounded-xl border-[1.5px] border-lime bg-pale p-4 lg:gap-5 lg:px-6 lg:py-5">
          <svg width="40" height="42" viewBox="0 0 42 42" fill="#B3C341" aria-hidden="true" className="shrink-0">
            <path
              d="M28 3l1.6 5M33.5 5.5l-1 5M37 10.5l-4 2.6"
              stroke="#B3C341"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M24.5 14.5V6.8a2.9 2.9 0 0 0-5.8 0v13.4l-3.4-2.6c-1.5-1.1-3.6-.7-4.5.9-.7 1.2-.5 2.7.5 3.7l7.6 7.6c1.4 1.4 3.3 2.2 5.3 2.2h4.5a6 6 0 0 0 6-6V17a2.7 2.7 0 0 0-5.4 0v-.4a2.7 2.7 0 0 0-5.4 0" />
            <rect x="2" y="21" width="12" height="4.6" rx="2.3" />
            <rect x="4" y="27.4" width="12" height="4.6" rx="2.3" />
            <rect x="6.5" y="33.8" width="12" height="4.6" rx="2.3" />
          </svg>
          <div>
            <h4 className="display m-0 text-xl lg:text-[26px]">{t.confusedTitle}</h4>
            <p className="m-0 mt-0.5 text-sm lg:text-[17px]">{t.confusedBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
