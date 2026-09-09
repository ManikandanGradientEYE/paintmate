"use client";

import FigmaBlob from "@/components/site/FigmaBlob";
import { useLanguage } from "@/context/LanguageContext";
import type { FigmaBox } from "@/lib/figmaBox";

/* ------------------------------------------------------------------------------
 * HERO BLOB POSITION — edit these numbers to move the paint blob.
 *
 * Copy the values straight out of Figma's properties panel (Width, Height, Left,
 * Top, Rotation, Opacity). No maths needed: the rotated bounding-box correction
 * Figma needs is applied for you in lib/figmaBox.ts.
 *
 *   left / top  →  negative moves it further off the left / top edge
 *   rotation    →  degrees, negative turns anticlockwise
 *   opacity     →  percent, as Figma shows it
 *
 * The hero clips whatever falls outside it, so a blob can safely hang off the edge.
 * ------------------------------------------------------------------------------ */
const HERO_BLOB_DESKTOP: FigmaBox = {
  width: 481.25,
  height: 539.32,
  left: -151,
  top: -112,
  rotation: -148.45,
  opacity: 50,
};

const HERO_BLOB_MOBILE: FigmaBox = {
  width: 190,
  height: 300,
  left: -56,
  top: -10,
  rotation: 0,
  opacity: 85,
};

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
