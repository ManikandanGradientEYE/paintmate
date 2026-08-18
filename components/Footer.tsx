"use client";

import { useQuote } from "@/context/QuoteContext";

export default function Footer() {
  const { t } = useQuote();
  return (
    <footer className="mt-8 pb-4 text-center text-xs text-ink-faint">
      {t.footerText}
    </footer>
  );
}
