"use client";

import Card from "@/components/ui/Card";
import { useQuote } from "@/context/QuoteContext";
import PaintCard from "./PaintCard";
import OtherBrandRow from "./OtherBrandRow";
import AddOns from "./AddOns";

export default function PaintSection() {
  const { state, dispatch, selectedPaint, availablePaints, t } = useQuote();

  return (
    <Card>
      <h2 className="text-base font-bold text-ink">{t.paintChooseYourPaint}</h2>

      <div className="mt-3 flex flex-col gap-2.5">
        {availablePaints.recommended.map((paint) => (
          <PaintCard
            key={paint.id}
            paint={paint}
            active={state.selectedPaintId === paint.id}
            onSelect={() => dispatch({ type: "SET_PAINT", id: paint.id })}
          />
        ))}
      </div>

      {availablePaints.other.length > 0 && (
        <>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-[11px] font-bold tracking-wider text-ink-faint">
              {t.paintOtherBrands}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="flex flex-col gap-2.5">
            {availablePaints.other.map((paint) => (
              <OtherBrandRow
                key={paint.id}
                paint={paint}
                active={state.selectedPaintId === paint.id}
                onSelect={() => dispatch({ type: "SET_PAINT", id: paint.id })}
              />
            ))}
          </div>

          <p className="mt-3 text-xs text-ink-faint">{t.paintPricesIndicative}</p>
        </>
      )}

      <AddOns />
      {state.addOns.painter && (
        <p className="mt-2 text-xs text-ink-faint">{t.paintPainterNote}</p>
      )}

      {selectedPaint.whyPick && (
        <div className="mt-5 rounded-xl bg-forest p-4">
          <p className="text-[11px] font-bold tracking-wider text-olive-light">
            {t.paintWhyThisPick}
          </p>
          <p className="mt-1 text-sm text-white/90">{selectedPaint.whyPick}</p>
        </div>
      )}
    </Card>
  );
}
