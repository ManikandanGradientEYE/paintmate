"use client";

import Card from "@/components/ui/Card";
import { useQuote } from "@/context/QuoteContext";
import { formatINR } from "@/lib/format";

export default function EstimateCard() {
  const { state, selectedPaint, estimate, t } = useQuote();

  return (
    <Card>
      <p className="text-[11px] font-bold tracking-wider text-brand-pink">
        {t.estimateYourEstimate}
      </p>
      <p className="mt-1 text-3xl font-extrabold text-forest">
        {formatINR(estimate.total)}
      </p>
      <p className="mt-0.5 text-sm text-ink-faint">
        {t.estimateRangeLabel} {formatINR(estimate.rangeLow)} –{" "}
        {formatINR(estimate.rangeHigh)}
      </p>

      <div className="mt-4 flex flex-col divide-y divide-line border-t border-line">
        {state.addOns.primer && (
          <LineItem
            label={t.estimatePrimerLabel}
            sub={`${estimate.primerLitres} L`}
            amount={formatINR(estimate.primerCost)}
          />
        )}
        <LineItem
          label={t.estimatePaintLabel(selectedPaint.name, state.coats)}
          sub={`${estimate.paintLitres} L`}
          amount={formatINR(estimate.paintCost)}
        />
        <LineItem
          label={t.estimatePaintPrimerSubtotal}
          amount={formatINR(estimate.paintPrimerSubtotal)}
          muted
        />
        <LineItem label={t.estimateGstOn} amount={formatINR(estimate.gst)} muted />
        {state.addOns.putty && (
          <LineItem
            label={t.estimateWallPutty}
            sub={t.estimateBagsKgLabel(estimate.puttyBags, estimate.puttyBags * 30)}
            amount={formatINR(estimate.puttyCost)}
          />
        )}
        <LineItem
          label={t.estimateDelivery}
          amount={
            estimate.deliveryFee === null
              ? t.estimateConfirmedOnWhatsApp
              : formatINR(estimate.deliveryFee)
          }
          muted
        />
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
        <p className="text-sm font-bold text-ink">{t.estimateEstimatedTotal}</p>
        <p className="text-lg font-extrabold text-forest">{formatINR(estimate.total)}</p>
      </div>

      <div className="mt-4 rounded-xl bg-tan px-4 py-3 text-xs font-semibold text-ink">
        {t.estimateDiscountNote}
      </div>
    </Card>
  );
}

function LineItem({
  label,
  sub,
  amount,
  muted = false,
}: {
  label: string;
  sub?: string;
  amount: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className={`text-sm ${muted ? "text-ink-muted" : "font-semibold text-ink"}`}>
          {label}
        </p>
        {sub && <p className="text-xs text-ink-faint">{sub}</p>}
      </div>
      <p className={`text-sm ${muted ? "text-ink-muted" : "font-bold text-ink"}`}>
        {amount}
      </p>
    </div>
  );
}
