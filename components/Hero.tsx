"use client";

import { useQuote } from "@/context/QuoteContext";

export default function Hero() {
  const { t } = useQuote();

  const badges = [
    { label: t.heroBadgeDelivery, className: "bg-tan text-ink" },
    { label: t.heroBadgeShadeMatching, className: "bg-rose text-ink" },
    { label: t.heroBadgeGst, className: "bg-sky text-ink" },
  ];

  return (
    <section>
      <h1 className="text-3xl font-extrabold leading-tight text-forest md:text-4xl">
        {t.heroTitle}
      </h1>
      <p className="mt-2 text-ink-muted">{t.heroSubtitle}</p>
      <p className="mt-4 max-w-2xl text-ink">
        {t.heroDescriptionPrefix}
        <span className="font-semibold">{t.heroDescriptionBold}</span>
        {t.heroDescriptionMiddle}
        <span className="font-semibold">{t.heroDescriptionBrand}</span>
        {t.heroDescriptionSuffix}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </section>
  );
}
