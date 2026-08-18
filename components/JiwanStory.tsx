"use client";

import { useQuote } from "@/context/QuoteContext";

export default function JiwanStory() {
  const { t } = useQuote();
  const badges = [t.storyBadge1, t.storyBadge2, t.storyBadge3, t.storyBadge4, t.storyBadge5];

  return (
    <section id="jiwan-story" className="mt-10 rounded-2xl bg-forest p-6 md:p-8">
      <h2 className="text-2xl font-extrabold text-white">{t.storyHeading}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
        {t.storyDescription}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {badges.map((badge) => (
          <div
            key={badge}
            className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
