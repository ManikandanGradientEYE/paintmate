"use client";

import FigmaBlob from "@/components/site/FigmaBlob";
import { useLanguage } from "@/context/LanguageContext";
// Shared with the /shop hero — see lib/blobs.ts to move either.
import { HERO_BLOB_DESKTOP, HERO_BLOB_MOBILE } from "@/lib/blobs";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <>
      <div className="bg-pale px-4 py-2.5 text-center text-sm font-bold lg:py-[11px] lg:text-[15px]">
        {t.announceBar}
      </div>

      <section className="relative overflow-hidden px-4 pb-14 pt-[46px] lg:px-[var(--pad)] lg:pb-[178px] lg:pt-[166px]">
        <FigmaBlob desktop={HERO_BLOB_DESKTOP} mobile={HERO_BLOB_MOBILE} />

        <h1 className="display relative mx-auto text-center text-[35px] leading-[1.06] lg:max-w-[782px] lg:text-[56px] lg:leading-[1.13]">
          {t.homeHeroTitle}{" "}
          <span className="block text-lime lg:inline">{t.homeHeroTitleAccent}</span>
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
