"use client";

import Card from "@/components/ui/Card";
import { useQuote } from "@/context/QuoteContext";
import { formatINR } from "@/lib/format";

export default function EstimateCard() {
  const { state, selectedPaint, estimate } = useQuote();

  return (
    <Card id="estimate">
      <p className="text-[11px] font-bold tracking-wider text-brand-pink">
        YOUR ESTIMATE
      </p>
      <p className="mt-1 text-3xl font-extrabold text-forest">
        {formatINR(estimate.total)}
      </p>
      <p className="mt-0.5 text-sm text-ink-faint">
        est. range {formatINR(estimate.rangeLow)} – {formatINR(estimate.rangeHigh)}
      </p>

      <div className="mt-4 flex flex-col divide-y divide-line border-t border-line">
        {state.addOns.primer && (
          <LineItem
            label="Primer (1 coat)"
            sub={`${estimate.primerLitres} L`}
            amount={formatINR(estimate.primerCost)}
          />
        )}
        <LineItem
          label={`${selectedPaint.name} (${state.coats} coat${state.coats > 1 ? "s" : ""})`}
          sub={`${estimate.paintLitres} L`}
          amount={formatINR(estimate.paintCost)}
        />
        <LineItem
          label="Paint + primer subtotal"
          amount={formatINR(estimate.paintPrimerSubtotal)}
          muted
        />
        <LineItem
          label="GST (18%) on paint + primer"
          amount={formatINR(estimate.gst)}
          muted
        />
        {state.addOns.putty && (
          <LineItem
            label="Wall putty (incl. GST)"
            sub={`${estimate.puttyBags} bag${estimate.puttyBags > 1 ? "s" : ""} / ${
              estimate.puttyBags * 30
            } kg`}
            amount={formatINR(estimate.puttyCost)}
          />
        )}
        <LineItem
          label="Delivery"
          amount={
            estimate.deliveryFee === null
              ? "Confirmed on WhatsApp"
              : formatINR(estimate.deliveryFee)
          }
          muted
        />
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
        <p className="text-sm font-bold text-ink">Estimated total</p>
        <p className="text-lg font-extrabold text-forest">{formatINR(estimate.total)}</p>
      </div>

      <div className="mt-4 rounded-xl bg-tan px-4 py-3 text-xs font-semibold text-ink">
        First order: 5% off. Second order: 10% off. Discount confirmed on final WhatsApp
        quote.
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
