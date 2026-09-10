"use client";

import FigmaBlob from "@/components/site/FigmaBlob";
import { useLanguage } from "@/context/LanguageContext";
import { fromFigma, type BlobPlacement } from "@/lib/figmaBox";

/* ------------------------------------------------------------------------------
 * REVIEWS BLOB — the lime stroke, in place of the cream blob.
 *
 * Figma quotes it in page coordinates (top 6266, left 1030) and this section starts
 * at page y 6408, so its own top is -142: it bleeds over the section's top edge and
 * off the right, both of which the section clips.
 * ------------------------------------------------------------------------------ */
const REVIEWS_BLOB_DESKTOP: BlobPlacement = fromFigma({
  width: 565,
  height: 501.19,
  left: 1030,
  top: -142,
  rotation: -180,
  opacity: 20, // percent, as Figma shows it
});

// Figma only specifies the desktop stroke; scaled for the narrow layout, where it
// sits in the band beside the heading rather than behind the opaque cards.
const REVIEWS_BLOB_MOBILE: BlobPlacement = {
  width: 250,
  height: 222,
  left: 190,
  top: -60,
  rotation: -180,
  opacity: 0.25,
};

export default function Reviews() {
  const { t } = useLanguage();
  const tilts = ["lg:-rotate-[1.4deg]", "lg:rotate-[.5deg]", "lg:rotate-[1.4deg]"];

  return (
    <section className="frame relative overflow-hidden pt-[46px] lg:px-[var(--pad)] lg:pt-[200px]">
      <FigmaBlob
        desktop={REVIEWS_BLOB_DESKTOP}
        mobile={REVIEWS_BLOB_MOBILE}
        src="/assets/stroke-lime.png"
      />

      <h2 className="display sec-title relative mb-6 lg:mb-[76px]">{t.reviewsTitle}</h2>

      <div className="hscroll relative px-4 pb-1.5 lg:grid lg:grid-cols-3 lg:items-start lg:gap-[47px] lg:overflow-visible lg:px-0">
        {tilts.map((tilt, i) => (
          <article
            key={i}
            className={`w-[280px] rounded-[16px] bg-sand p-6 lg:w-auto lg:rounded-[18px] lg:px-[34px] lg:pb-10 lg:pt-[34px] ${tilt}`}
          >
            <span
              aria-hidden="true"
              className="display block text-[40px] leading-none text-lime lg:mb-2.5 lg:text-[56px]"
            >
              &rdquo;
            </span>
            <p className="m-0 text-[15px] leading-[1.5] lg:text-[18px]">{t.reviewBody}</p>
            <div className="mt-4 text-[15px] lg:mt-[22px] lg:text-[18px]">
              <b className="block font-extrabold">{t.reviewName}</b>
              {t.reviewRole}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
