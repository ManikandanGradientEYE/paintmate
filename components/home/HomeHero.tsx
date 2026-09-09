"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <>
      <div className="bg-pale px-4 py-2.5 text-center text-sm font-bold lg:py-[11px] lg:text-[15px]">
        {t.announceBar}
      </div>

      {/* The hero blob is rotated and pushed off the left edge, per the Figma frame —
          the section clips it, so only its right-hand part shows. Other sections keep
          the upright blob. */}
      <section className="blob relative overflow-hidden px-4 pb-14 pt-[46px] lg:px-[var(--pad)] lg:pb-[178px] lg:pt-[166px] [&::before]:left-[-86px] [&::before]:top-[-10px] [&::before]:h-[300px] [&::before]:w-[190px] [&::before]:rotate-[-30deg] [&::before]:opacity-[.85] lg:[&::before]:left-[-190px] lg:[&::before]:top-[-30px] lg:[&::before]:h-[640px] lg:[&::before]:w-[470px] lg:[&::before]:opacity-[.55]">
        <h1 className="display relative mx-auto text-center text-[35px] leading-[1.06] lg:max-w-[782px] lg:text-[56px] lg:leading-[1.13]">
          {t.homeHeroTitle} <span className="block text-lime lg:inline">{t.homeHeroTitleAccent}</span>
        </h1>
        <p className="relative mt-[18px] text-center text-base leading-[1.42] lg:mt-[26px] lg:text-[26px]">
          {t.homeHeroSub}
          <b className="mt-0.5 block font-extrabold italic text-forest lg:mt-0">
            {t.homeHeroSubBold}
          </b>
        </p>
      </section>
    </>
  );
}
