"use client";

import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatINR } from "@/lib/format";
import { Paint } from "@/types";

function PaintThumb({ paint }: { paint: Paint }) {
  if (paint.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={paint.imageUrl}
        alt=""
        className="h-[47px] w-[46px] shrink-0 rounded-[7px] border border-[#EDEDED] object-cover lg:h-[60px] lg:w-[60px]"
      />
    );
  }
  return (
    <span
      className="h-[47px] w-[46px] shrink-0 rounded-[7px] border border-[#EDEDED] bg-white lg:h-[60px] lg:w-[60px]"
      style={{
        background: "#fff url(/assets/bucket.png) center/32px auto no-repeat",
      }}
    />
  );
}

function PaintRow({
  paint,
  active,
  onSelect,
  plain = false,
}: {
  paint: Paint;
  active: boolean;
  onSelect: () => void;
  plain?: boolean;
}) {
  const { t } = useLanguage();
  const tier = paint.tier === "Premium" ? t.tierPremium : t.tierValue;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`relative mb-3 flex w-full items-center gap-[11px] rounded-[13px] border-[1.5px] p-[11px] text-left transition lg:gap-[18px] lg:rounded-xl lg:px-[18px] lg:py-3.5 ${
        active
          ? "border-lime bg-pale-2"
          : plain
            ? "border-line bg-white"
            : "border-lime bg-white"
      }`}
    >
      {active && !plain && (
        <span className="absolute -top-[11px] right-0 rounded-pill bg-forest px-3 py-1 text-xs font-bold text-white lg:px-3.5 lg:py-[5px] lg:text-[13px]">
          {t.paintRecommended}
        </span>
      )}
      <PaintThumb paint={paint} />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-extrabold leading-tight tracking-[-0.012em] lg:text-[21px]">
          {paint.name}
        </span>
        {!plain && paint.whyPick && (
          <span className="mt-[5px] block truncate border-b border-black/20 pb-[7px] text-[11px] font-bold lg:mt-1.5 lg:pb-[9px] lg:text-[15px]">
            {paint.whyPick}
          </span>
        )}
        <span className="mt-1.5 block text-[12.5px] text-[#4C4C4C] lg:text-sm">
          {paint.brand} · {paint.approxPrice ? "~" : ""}
          {formatINR(paint.pricePerLitre)}/L · {tier}
        </span>
      </span>
    </button>
  );
}

export default function PaintPickerCard() {
  const { state, dispatch, availablePaints } = useQuote();
  const { t } = useLanguage();

  return (
    <section className="pm-card">
      <h2 className="display mb-[18px] text-[21px] lg:mb-[22px] lg:text-[26px]">
        {t.paintChooseYourPaint}
      </h2>

      {availablePaints.recommended.map((paint) => (
        <PaintRow
          key={paint.id}
          paint={paint}
          active={state.selectedPaintId === paint.id}
          onSelect={() => dispatch({ type: "SET_PAINT", id: paint.id })}
        />
      ))}

      {availablePaints.other.length > 0 && (
        <>
          <div className="mb-[18px] mt-[26px] flex items-center gap-3">
            <span className="h-px flex-1 bg-forest" />
            <span className="display text-[21px] text-lime lg:text-[26px]">
              {t.paintOtherBrands}
            </span>
            <span className="h-px flex-1 bg-forest" />
          </div>

          <div className="thin-scroll max-h-[290px] overflow-y-auto pr-2.5 lg:max-h-[330px]">
            {availablePaints.other.map((paint) => (
              <PaintRow
                key={paint.id}
                paint={paint}
                plain
                active={state.selectedPaintId === paint.id}
                onSelect={() => dispatch({ type: "SET_PAINT", id: paint.id })}
              />
            ))}
          </div>

          <p className="mt-4 text-[13.5px] leading-[1.45] text-[#333] lg:text-[15px]">
            {t.paintPricesIndicative}
          </p>
        </>
      )}
    </section>
  );
}
