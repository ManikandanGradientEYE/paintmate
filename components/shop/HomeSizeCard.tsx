"use client";

import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";

const MIN_AREA_SQFT = 200;
const MAX_AREA_SQFT = 8000;

export default function HomeSizeCard() {
  const { state, dispatch, homeSizes } = useQuote();
  const { t } = useLanguage();

  const fillPct =
    ((state.areaSqft - MIN_AREA_SQFT) / (MAX_AREA_SQFT - MIN_AREA_SQFT)) * 100;

  return (
    <section className="pm-card">
      <h2 className="display mb-[18px] text-[21px] lg:mb-[22px] lg:text-[26px]">
        {t.calcHeading}
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-[22px]">
        {homeSizes.map((size) => {
          const active = state.homeSizeId === size.id;
          return (
            <button
              key={size.id}
              type="button"
              aria-pressed={active}
              onClick={() => dispatch({ type: "SET_HOME_SIZE", id: size.id })}
              className={`rounded-xl border-[1.5px] px-2 py-3 text-center transition lg:rounded-[10px] lg:px-2.5 lg:py-[15px] ${
                active ? "border-[#CFD388] bg-pale" : "border-line bg-white"
              }`}
            >
              <span className="block text-[15.5px] font-extrabold lg:text-[17px]">
                {size.label}
              </span>
              <span className="mt-[3px] block text-[13.5px] lg:text-sm">
                {size.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      <div className="my-[22px] flex items-center gap-3 lg:my-[30px]">
        <span className="h-px flex-1 bg-line" />
        <span className="display text-xl text-lime lg:text-[26px]">{t.calcOr}</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="flex items-center gap-2">
        <h3 className="display m-0 min-w-0 flex-1 whitespace-nowrap text-[15px] leading-[1.1] lg:text-[26px]">
          {t.calcSetExactArea}
        </h3>
        <input
          type="number"
          value={state.areaSqft}
          min={MIN_AREA_SQFT}
          max={MAX_AREA_SQFT}
          onChange={(e) =>
            dispatch({
              type: "SET_AREA",
              sqft: Math.max(
                MIN_AREA_SQFT,
                Math.min(MAX_AREA_SQFT, Number(e.target.value) || 0)
              ),
            })
          }
          aria-label={t.calcSetExactArea}
          className="w-[86px] rounded-[9px] border-[1.5px] border-line bg-white px-1.5 py-2.5 text-center text-[17px] font-extrabold text-ink outline-none focus:border-lime lg:w-[78px] lg:text-[19px]"
        />
        <span className="whitespace-nowrap text-sm">sq ft</span>
      </div>

      <input
        type="range"
        className="pm-range mb-0.5 mt-[22px] lg:mb-1 lg:mt-[30px]"
        min={MIN_AREA_SQFT}
        max={MAX_AREA_SQFT}
        step={50}
        value={state.areaSqft}
        onChange={(e) => dispatch({ type: "SET_AREA", sqft: Number(e.target.value) })}
        aria-label={t.calcSetExactArea}
        style={{
          background: `linear-gradient(#B3C341,#B3C341) 0/${fillPct}% 100% no-repeat #E8ECC5`,
        }}
      />
    </section>
  );
}
