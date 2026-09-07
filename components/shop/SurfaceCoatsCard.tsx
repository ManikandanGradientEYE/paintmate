"use client";

import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";
import { Coats, Surface } from "@/types";

const COATS: Coats[] = [1, 2, 3];

export default function SurfaceCoatsCard() {
  const { state, dispatch } = useQuote();
  const { t } = useLanguage();

  const surfaces: { id: Surface; label: string }[] = [
    { id: "interior", label: t.calcInterior },
    { id: "exterior", label: t.calcExterior },
  ];

  return (
    <section className="pm-card">
      <div className="grid grid-cols-[1fr_1px_1fr] items-start gap-4 lg:gap-x-[52px]">
        <div>
          <h2 className="display mb-4 text-center text-[21px] lg:mb-[26px] lg:text-left lg:text-[26px]">
            {t.calcSurface}
          </h2>
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-[18px]">
            {surfaces.map((s) => {
              const active = state.surface === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => dispatch({ type: "SET_SURFACE", surface: s.id })}
                  className={`w-full rounded-xl border-[1.5px] px-2 py-3.5 text-[15.5px] font-extrabold transition lg:py-[18px] lg:text-[19px] ${
                    active ? "border-[#CFD388] bg-pale" : "border-line bg-white"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="self-stretch bg-line" />

        <div>
          <h2 className="display mb-4 text-center text-[21px] lg:mb-[26px] lg:text-left lg:text-[26px]">
            {t.calcCoats}
          </h2>
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-start lg:gap-[22px]">
            {COATS.map((coats) => {
              const active = state.coats === coats;
              return (
                <button
                  key={coats}
                  type="button"
                  aria-pressed={active}
                  onClick={() => dispatch({ type: "SET_COATS", coats })}
                  className={`grid h-[46px] w-[46px] place-items-center rounded-full border-[1.5px] text-base font-bold transition lg:h-14 lg:w-14 lg:text-xl ${
                    active ? "border-[#CFD388] bg-pale" : "border-line bg-white"
                  }`}
                >
                  {coats}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
