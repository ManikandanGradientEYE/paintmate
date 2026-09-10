"use client";

import FigmaBlob from "@/components/site/FigmaBlob";
import { useLanguage } from "@/context/LanguageContext";
import type { BlobPlacement } from "@/lib/figmaBox";

/* ------------------------------------------------------------------------------
 * ABOUT BLOB POSITION — the blue stroke behind this section.
 *
 * Plain CSS values, i.e. what devtools shows on `.pm-blob`: inspect it, drag the
 * numbers until it looks right, then paste them back here. See HomeHero for the
 * full notes, including how to convert Figma's properties panel with fromFigma().
 *
 * top / left are measured from this section's own top-left corner, and the section
 * clips whatever falls outside it, so the stroke can safely hang off the edge.
 *
 * Figma quoted this one as top 1200 / left -57, but those are page coordinates: the
 * section itself starts at y 1211, so the stroke belongs at the section's top edge,
 * 11px above it. Dropping 1200 in as-is would park it below the section and clip it
 * away entirely.
 * ------------------------------------------------------------------------------ */
const ABOUT_BLOB_DESKTOP: BlobPlacement = {
  width: 549,
  height: 487,
  left: -57,
  top: -11,
  rotation: 0,
  opacity: 0.2,
};

// Figma only specifies the desktop stroke; this keeps the same edge bleed and
// proportions at half scale so the narrow layout is not swamped by it.
const ABOUT_BLOB_MOBILE: BlobPlacement = {
  width: 275,
  height: 244,
  left: -60,
  top: -10,
  rotation: 0,
  opacity: 0.25,
};

export default function AboutSection() {
  const { t } = useLanguage();

  const chips = [
    { n: t.statYearsN, label: t.statYearsT, tone: "lime" as const },
    { n: t.statFacilityN, label: t.statFacilityT, tone: "mint" as const },
    { n: t.statIsoN, label: t.statIsoT, tone: "mint" as const, small: true },
    { n: t.statPlantsN, label: t.statPlantsT, tone: "lime" as const },
  ];

  // No `blob` class on the section: the blue stroke replaces the cream blob here.
  return (
    <section className="frame relative overflow-hidden px-4 pt-[46px] lg:grid lg:grid-cols-[570px_1fr] lg:items-start lg:gap-x-14 lg:px-[var(--pad)] lg:pt-[200px]">
      <FigmaBlob
        desktop={ABOUT_BLOB_DESKTOP}
        mobile={ABOUT_BLOB_MOBILE}
        src="/assets/90fc13fd43caea53aad965a7ea6b9bbe2882c7bf.png"
      />

      <h2 className="display sec-title relative mb-4 lg:col-start-1 lg:row-start-1 lg:mb-[70px] lg:text-left">
        {t.aboutTitle}
      </h2>
      <p className="relative m-0 text-justify text-[15px] leading-[1.72] lg:col-start-2 lg:row-start-1 lg:text-[19px] lg:leading-[1.55]">
        {t.aboutBody}
      </p>

      <div className="relative hidden lg:col-start-1 lg:row-start-2 lg:block lg:h-[407px] lg:overflow-hidden lg:rounded-[14px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/villa.jpg"
          alt="Jiwan Group facility"
          className="h-full w-full object-cover"
        />
      </div>

      {/* stat chips */}
      <div className="relative grid grid-cols-2 items-stretch gap-3 pt-[22px] lg:col-start-2 lg:row-start-2 lg:mt-[38px] lg:gap-[22px] lg:self-start lg:pt-0">
        <div className="row-span-2 min-h-[210px] overflow-hidden rounded-[14px] bg-[#cfd6c9] lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/villa.jpg"
            alt="Jiwan Group facility"
            className="h-full w-full object-cover"
          />
        </div>

        {chips.map((chip) => (
          <div
            key={chip.label}
            className="relative flex min-h-[100px] flex-col items-center justify-center py-3.5 pl-3 pr-10 text-center lg:min-h-[126px] lg:p-4 lg:pr-[58px]"
            style={{
              background: `url(/assets/chip-${chip.tone}.png) center/100% 100% no-repeat`,
            }}
          >
            <span
              className={`display relative z-[1] leading-none ${
                chip.small ? "text-[21px] leading-[1.08] lg:text-[26px]" : "text-[27px] lg:text-[33px]"
              }`}
            >
              {chip.n}
            </span>
            <span className="relative z-[1] mt-1 text-sm leading-[1.28] text-ink lg:mt-[5px] lg:text-base">
              {chip.label}
            </span>
          </div>
        ))}
      </div>

      {/* marquee */}
      <div
        className="relative mt-[26px] overflow-hidden py-1 lg:col-span-2 lg:mt-[112px]"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={`display whitespace-nowrap pr-4 text-[26px] lg:pr-[26px] lg:text-[44px] ${
                i % 2 === 1 ? "text-lime" : ""
              }`}
            >
              {t.marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
