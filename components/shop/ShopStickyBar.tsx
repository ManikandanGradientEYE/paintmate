"use client";

import { useState } from "react";
import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatINR } from "@/lib/format";
import EstimateCard from "./EstimateCard";

/**
 * Mobile-only sticky estimate bar from the Figma shop frame.
 * Desktop puts the estimate in the sticky right-hand column instead.
 */
export default function ShopStickyBar() {
  const { estimate } = useQuote();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] lg:hidden">
      {open && (
        <>
          <button
            type="button"
            aria-label={t.stickyHideBreakdown}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/30"
          />
          <div className="thin-scroll relative z-[70] max-h-[70vh] overflow-y-auto rounded-t-2xl bg-cream px-4 pt-3 shadow-[0_-12px_28px_rgba(0,0,0,.15)]">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
            <EstimateCard />
            <div className="h-4" />
          </div>
        </>
      )}

      <div className="relative z-[70] bg-forest pb-[env(safe-area-inset-bottom)]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center gap-3 bg-pale px-4 py-3 text-left text-[15px] font-bold"
        >
          <span>
            {t.stickyYourEstimate} {formatINR(estimate.total)}
          </span>
          <span className="relative h-px flex-1 bg-forest">
            <span className="absolute right-0 top-[-3px] border-y-[3.5px] border-l-[6px] border-y-transparent border-l-forest" />
          </span>
          <span className="whitespace-nowrap font-extrabold underline">
            {t.stickyKnowDetails}
          </span>
        </button>

        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="display block px-4 py-4 text-center text-[22px] tracking-wide text-white"
        >
          {t.locationGetQuoteButton}
        </a>
      </div>
    </div>
  );
}
