"use client";

import { useQuote } from "@/context/QuoteContext";
import { formatINR } from "@/lib/format";

export default function StickyBar() {
  const { estimate } = useQuote();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 md:px-6">
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
          className="rounded-full bg-brand-pink px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-105"
        >
          Get quote on WhatsApp
        </a>
      </div>
    </div>
  );
}
