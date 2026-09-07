"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n";

const LANGUAGES: { id: Language; label: string }[] = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिंदी" },
  { id: "pa", label: "ਪੰਜਾਬੀ" },
];

export default function SiteHeader({
  quoteButton = "always",
  quoteHref = "/shop",
}: {
  /** the Figma shop frame hides this button on mobile, home shows it everywhere */
  quoteButton?: "always" | "desktopOnly" | "none";
  quoteHref?: string;
}) {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] bg-header">
      <div className="pad-x flex h-[86px] items-center gap-3 lg:h-[97px]">
        {/* burger — mobile nav + language */}
        <button
          type="button"
          aria-label={t.navMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative h-[18px] w-[26px] shrink-0 lg:hidden"
        >
          <i className="absolute left-0 top-0 h-[3px] w-[26px] rounded-sm bg-forest" />
          <i className="absolute left-0 top-[7.5px] h-[3px] w-[26px] rounded-sm bg-forest" />
          <i className="absolute left-0 top-[15px] h-[3px] w-[18px] rounded-sm bg-forest" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-[9px]">
          <span className="block lg:hidden">
            <Logo />
          </span>
          <span className="hidden lg:block">
            <Logo width={52} height={57} />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="whitespace-nowrap text-[21px] font-extrabold tracking-[-0.02em] text-forest lg:text-[29px]">
              Paint <em className="not-italic text-lime">Mate</em>
            </span>
            <span className="mt-[3px] whitespace-nowrap text-[6.5px] font-semibold uppercase tracking-[0.19em] text-[#5B6B5B] lg:mt-1 lg:text-[8.5px] lg:tracking-[0.2em]">
              {t.brandTagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          {/* language — inline on desktop, in the burger menu on mobile */}
          <div className="hidden items-center gap-1 lg:flex">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLanguage(lang.id)}
                className={`rounded-pill border px-3 py-1.5 text-sm font-semibold transition ${
                  language === lang.id
                    ? "border-forest bg-pale text-forest"
                    : "border-transparent text-ink-muted hover:text-forest"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {quoteButton !== "none" && (
            <Link
              href={quoteHref}
              className={`quote-brush ${
                quoteButton === "desktopOnly" ? "hidden lg:inline-flex" : ""
              }`}
            >
              <span>{t.getAQuote}</span>
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="pad-x border-t border-line bg-header pb-5 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-bold text-forest hover:bg-pale"
            >
              {t.navHome}
            </Link>
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-bold text-forest hover:bg-pale"
            >
              {t.navPaintShop}
            </Link>
          </nav>

          <p className="mt-4 px-3 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            {t.navLanguage}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 px-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLanguage(lang.id)}
                className={`rounded-pill border px-4 py-2 text-sm font-semibold transition ${
                  language === lang.id
                    ? "border-forest bg-pale text-forest"
                    : "border-line text-ink-muted"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
