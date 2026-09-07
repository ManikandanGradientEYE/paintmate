"use client";

import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";

function Tick({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill={on ? "#111" : "#C9C9C9"}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M7.5 12.4l3 3 6-6.4"
        stroke="#fff"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AddOnsCard() {
  const { state, dispatch, addOns } = useQuote();
  const { t } = useLanguage();

  const putty = addOns.find((a) => a.slug === "putty");
  const primer = addOns.find((a) => a.slug === "primer");
  const painter = addOns.find((a) => a.slug === "painter");

  const toggles = [
    { key: "putty" as const, label: putty?.label ?? "Wall Putty", on: state.addOns.putty },
    { key: "primer" as const, label: primer?.label ?? "Primer", on: state.addOns.primer },
  ];

  return (
    <section className="pm-card">
      <h2 className="display mb-[18px] text-[21px] lg:mb-[22px] lg:text-[26px]">
        {t.addOnsTitle}
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:gap-[22px]">
        {toggles.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={item.on}
            onClick={() => dispatch({ type: "TOGGLE_ADDON", id: item.key })}
            className={`flex items-center justify-center gap-2.5 rounded-xl border-[1.5px] px-2.5 py-3.5 text-base font-extrabold transition lg:py-[17px] lg:text-[19px] ${
              item.on ? "border-[#CFD388] bg-pale" : "border-line bg-white"
            }`}
          >
            <Tick on={item.on} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white px-3.5 py-3 lg:px-[18px] lg:py-3.5">
        <span className="flex-1 text-base font-extrabold lg:text-[19px]">
          {painter?.label ?? t.addPainter}
        </span>
        <button
          type="button"
          aria-label="Remove a painter"
          onClick={() => dispatch({ type: "SET_PAINTER_COUNT", count: state.painterCount - 1 })}
          disabled={state.painterCount === 0}
          className="grid h-[34px] w-[34px] place-items-center rounded-full bg-pale text-xl font-bold leading-none text-forest disabled:opacity-40"
        >
          −
        </button>
        <span className="min-w-4 text-center text-[17px] font-extrabold">
          {state.painterCount}
        </span>
        <button
          type="button"
          aria-label="Add a painter"
          onClick={() => dispatch({ type: "SET_PAINTER_COUNT", count: state.painterCount + 1 })}
          className="grid h-[34px] w-[34px] place-items-center rounded-full bg-lime text-xl font-bold leading-none text-forest"
        >
          +
        </button>
      </div>

      {state.painterCount > 0 && (
        <p className="mt-3 text-[13.5px] leading-[1.45] text-[#333] lg:text-[15px]">
          {t.paintPainterNote}
        </p>
      )}
    </section>
  );
}
