"use client";

import { useState } from "react";
import { useQuote } from "@/context/QuoteContext";
import { formatINR } from "@/lib/format";
import EstimateCard from "./EstimateCard";

export default function StickyBar() {
  const { estimate } = useQuote();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
      {expanded && (
        <button
          type="button"
          aria-label="Close estimate breakdown"
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-30 bg-ink/30"
        />
      )}

      {expanded && (
        <div className="relative z-40 max-h-[75vh] overflow-y-auto rounded-t-2xl bg-cream px-4 pt-3 shadow-[0_-12px_28px_rgba(0,0,0,0.15)]">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
          <EstimateCard />
        </div>
      )}

      <div className="relative z-40 border-t border-line bg-white">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-center gap-1.5 pt-1.5 text-[11px] font-bold tracking-wide text-ink-faint"
        >
          {expanded ? "HIDE BREAKDOWN" : "VIEW BREAKDOWN"}
          <span
            className={`inline-block text-sm leading-none transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          >
            ▲
          </span>
        </button>

        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 pb-3 pt-1 md:px-6">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-ink-faint">
              ESTIMATED TOTAL
            </p>
            <p className="text-lg font-extrabold text-forest">
              {formatINR(estimate.total)}
            </p>
          </div>
          <a
            href="#contact"
            onClick={() => setExpanded(false)}
            className="rounded-full bg-brand-pink px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-105"
          >
            Get quote on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
