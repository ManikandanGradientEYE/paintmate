"use client";

import { useQuote } from "@/context/QuoteContext";

const LANGUAGES: { id: "en" | "hi" | "pa"; label: string }[] = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिंदी" },
  { id: "pa", label: "ਪੰਜਾਬੀ" },
];

export default function Header() {
  const { state, dispatch, t } = useQuote();

  return (
    <header className="sticky top-0 z-30 bg-cream">
      <div
        className="h-2 w-full"
        style={{
          background:
            "linear-gradient(to right, #5FA8C7 0 14%, #8FA23A 14% 28%, #1F3D24 28% 42%, #F0A7C0 42% 56%, #EFE2CC 56% 70%, #E07C2E 70% 84%, #E01267 84% 100%)",
        }}
      />
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
        <div>
          <p className="text-xl font-extrabold leading-none text-forest">Paint Mate</p>
          <p className="mt-1 text-[11px] font-semibold tracking-wide text-ink-faint">
            {t.headerTagline.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {LANGUAGES.map((lang) => {
            const active = state.language === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => dispatch({ type: "SET_LANGUAGE", language: lang.id })}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border-forest text-forest"
                    : "border-transparent bg-white text-ink-muted"
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl gap-3 px-4 pb-4 md:px-6">
        <a
          href="#contact"
          className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white"
        >
          {t.headerGetQuote}
        </a>
        <a
          href="#jiwan-story"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-muted"
        >
          {t.headerAboutJiwan}
        </a>
      </div>
    </header>
  );
}
