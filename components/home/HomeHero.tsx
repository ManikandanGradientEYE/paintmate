"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <>
      <div className="bg-pale px-4 py-2.5 text-center text-sm font-bold lg:py-[11px] lg:text-[15px]">
        {t.announceBar}
      </div>

      {/* Desktop blob comes from the Figma hero frame: 481.25 x 539.32, rotate
          -148.45deg, 50% opacity, X -151 / Y -112.
          Figma's X/Y describe the ROTATED bounding box (692.3 x 711.4 here), while CSS
          left/top place the UNROTATED box that rotate() then spins about its centre.
          So the Figma values are shifted by half the bbox growth:
            left = -151 + (692.3 - 481.25)/2 = -45.5
            top  = -112 + (711.4 - 539.32)/2 = -26
          The section clips it, so only the part inside the viewport shows. Mobile keeps
          the upright blob from the mobile frame; other sections are unchanged. */}
      <section className="blob relative overflow-hidden px-4 pb-14 pt-[46px] lg:px-[var(--pad)] lg:pb-[178px] lg:pt-[166px] [&::before]:left-[-56px] [&::before]:top-[-10px] [&::before]:h-[300px] [&::before]:w-[190px] [&::before]:opacity-[.85] lg:[&::before]:left-[-45.5px] lg:[&::before]:top-[-26px] lg:[&::before]:h-[539.32px] lg:[&::before]:w-[481.25px] lg:[&::before]:rotate-[-148.45deg] lg:[&::before]:opacity-50">
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
