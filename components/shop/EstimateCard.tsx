"use client";

import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatINR } from "@/lib/format";

function Line({
  label,
  sub,
  value,
  plain = false,
}: {
  label: string;
  sub?: string;
  value: string;
  plain?: boolean;
}) {
  return (
    <div className="mb-3.5 flex justify-between gap-4">
      <span className={`text-[15.5px] lg:text-[17px] ${plain ? "" : "font-bold"}`}>
        {label}
        {sub && (
          <small className="mt-px block text-sm font-normal lg:text-[15px]">{sub}</small>
        )}
      </span>
      <span
        className={`whitespace-nowrap text-[15.5px] lg:text-[17px] ${
          plain ? "" : "font-extrabold"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function EstimateCard() {
  const { state, selectedPaint, selectedShade, estimate } = useQuote();
  const { t } = useLanguage();

  const rupees = formatINR(estimate.total).replace("₹", "");

  return (
    <section className="pm-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="display text-[44px] leading-[.95] lg:text-[46px]">
            <small className="align-top text-2xl leading-none lg:text-[26px]">₹</small>
            {rupees}
          </div>
          <div className="mt-1.5 text-[13.5px] text-ink-muted lg:text-[15px]">
            {t.estimateRangeLabel} {formatINR(estimate.rangeLow)} –{" "}
            {formatINR(estimate.rangeHigh)}
          </div>
        </div>
        <div className="whitespace-nowrap pt-1 text-sm text-ink lg:text-[15px]">
          {t.estimateYourEstimate}
        </div>
      </div>

      {selectedShade && (
        <div className="mt-[18px] flex items-center gap-3.5 rounded-[10px] border-[1.5px] border-line bg-cream px-3.5 py-2.5 lg:px-4 lg:py-3">
          <span
            className="h-[38px] w-[38px] shrink-0 rounded-lg"
            style={{ background: selectedShade.hex }}
          />
          <span className="text-[17px] lg:text-[19px]">
            <b className="font-extrabold">{selectedShade.code}</b> ·{" "}
            {selectedShade.hex.toUpperCase()}
          </span>
        </div>
      )}

      <hr className="my-5 border-0 border-t border-forest" />

      {state.addOns.primer && (
        <Line
          label={t.estimatePrimerLabel}
          sub={`${estimate.primerLitres} L`}
          value={formatINR(estimate.primerCost)}
        />
      )}
      <Line
        label={t.estimatePaintLabel(selectedPaint.name, state.coats)}
        sub={`${estimate.paintLitres} L`}
        value={formatINR(estimate.paintCost)}
      />
      <Line
        label={t.estimatePaintPrimerSubtotal}
        value={formatINR(estimate.paintPrimerSubtotal)}
        plain
      />
      <Line label={t.estimateGstOn} value={formatINR(estimate.gst)} plain />
      {state.addOns.putty && (
        <Line
          label={t.estimateWallPutty}
          sub={t.estimateBagsKgLabel(estimate.puttyBags, estimate.puttyBags * 30)}
          value={formatINR(estimate.puttyCost)}
        />
      )}
      {estimate.painterCount > 0 && (
        <Line
          label={t.estimatePainter}
          sub={t.estimatePainterCount(estimate.painterCount)}
          value={formatINR(estimate.painterCost)}
        />
      )}
      <Line
        label={t.estimateDelivery}
        plain
        value={
          estimate.deliveryFee === null
            ? t.estimateConfirmedOnWhatsApp
            : estimate.deliveryFee === 0
              ? t.estimateFree
              : formatINR(estimate.deliveryFee)
        }
      />

      <hr className="my-5 border-0 border-t border-forest" />

      <div className="flex justify-between text-[19px] font-extrabold lg:text-[21px]">
        <span>{t.estimateEstimatedTotal}</span>
        <span>{formatINR(estimate.total)}</span>
      </div>

      <p className="mt-5 rounded-[10px] border border-line bg-[#F6F1E9] px-4 py-3.5 text-sm leading-[1.5] lg:text-[15px]">
        {t.estimateDiscountNote}
      </p>
    </section>
  );
}
