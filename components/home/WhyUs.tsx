"use client";

import FigmaBlob from "@/components/site/FigmaBlob";
import { useLanguage } from "@/context/LanguageContext";
import type { BlobPlacement } from "@/lib/figmaBox";

/* ------------------------------------------------------------------------------
 * WHY US BLOB — the same blue stroke as About Paint Mate, turned and stretched.
 *
 * Plain CSS values, straight out of devtools on `.pm-blob` — inspect it, drag the
 * numbers, paste them back. scaleY: 2 is the vertical stretch; the component turns
 * scaleX / scaleY into --blob-sx / --blob-sy.
 *
 * Rotation is written unitless here and the component appends deg. Setting
 * --blob-rot to a bare number in devtools instead makes the whole transform
 * invalid, so the blob quietly loses its rotation, flip and stretch at once.
 * ------------------------------------------------------------------------------ */
const WHY_BLOB_DESKTOP: BlobPlacement = {
  width: 318.96,
  height: 357.45,
  left: 310.24,
  top: 19.95,
  rotation: 65,
  opacity: 0.2,
  flipX: true,
  scaleY: 2,
};

const WHY_BLOB_MOBILE: BlobPlacement = {
  width: 175,
  height: 196,
  left: 39,
  top: -13,
  rotation: 65,
  opacity: 0.2,
  flipX: true,
  scaleY: 2,
};

function IconChoose() {
  return (
    <svg width="42" height="40" viewBox="0 0 42 40" fill="#B3C341" aria-hidden="true">
      <rect x="1" y="2" width="24" height="11" rx="2" />
      <path d="M25 5h9a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-8v-3h7.5V8H25V5z" />
      <rect x="3" y="16" width="3" height="11" rx="1.5" />
      <rect x="9" y="16" width="3" height="8" rx="1.5" />
      <rect x="15" y="16" width="3" height="12" rx="1.5" />
      <rect x="24.5" y="16" width="3" height="9" rx="1.5" />
      <rect x="23.5" y="26" width="5" height="12" rx="2.5" />
    </svg>
  );
}

function IconKnow() {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" fill="#7FB2C0" aria-hidden="true">
      <circle cx="12" cy="16" r="6" fill="none" stroke="#7FB2C0" strokeWidth="2.4" />
      <path d="M2 38v-4a10 10 0 0 1 20 0v4H2z" />
      <rect x="24" y="2" width="20" height="14" rx="2.5" />
      <path d="M27 16l0 6 6-6h-6z" />
      <rect x="27" y="5.5" width="12" height="2" rx="1" fill="#E2EDE9" />
      <rect x="27" y="10" width="14" height="2" rx="1" fill="#E2EDE9" />
      <circle cx="12" cy="33" r="1.8" fill="#E2EDE9" />
    </svg>
  );
}

function IconBuy() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="#B3C341" aria-hidden="true">
      <path
        d="M28 3l1.6 5M33.5 5.5l-1 5M37 10.5l-4 2.6"
        stroke="#B3C341"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M24.5 14.5V6.8a2.9 2.9 0 0 0-5.8 0v13.4l-3.4-2.6c-1.5-1.1-3.6-.7-4.5.9-.7 1.2-.5 2.7.5 3.7l7.6 7.6c1.4 1.4 3.3 2.2 5.3 2.2h4.5a6 6 0 0 0 6-6V17a2.7 2.7 0 0 0-5.4 0v-.4a2.7 2.7 0 0 0-5.4 0" />
      <rect x="2" y="21" width="12" height="4.6" rx="2.3" />
      <rect x="4" y="27.4" width="12" height="4.6" rx="2.3" />
      <rect x="6.5" y="33.8" width="12" height="4.6" rx="2.3" />
    </svg>
  );
}

export default function WhyUs() {
  const { t } = useLanguage();

  const cards = [
    { icon: <IconChoose />, title: t.why1Title, body: t.why1Body, tone: "lime" },
    { icon: <IconKnow />, title: t.why2Title, body: t.why2Body, tone: "mint" },
    { icon: <IconBuy />, title: t.why3Title, body: t.why3Body, tone: "lime" },
    { icon: <IconKnow />, title: t.why2Title, body: t.why2Body, tone: "mint", desktopOnly: true },
  ];

  // No `blob` class: the blue stroke above replaces the cream blob here too.
  return (
    <section className="relative overflow-hidden pt-[58px] lg:pt-[132px]">
      <FigmaBlob
        desktop={WHY_BLOB_DESKTOP}
        mobile={WHY_BLOB_MOBILE}
        src="/assets/90fc13fd43caea53aad965a7ea6b9bbe2882c7bf.png"
      />

      <h2 className="display sec-title relative mb-[22px] lg:mb-[72px]">
        {t.whyUsTitle}
        <span className="lg:hidden">!</span>
      </h2>

      <div className="frame relative mx-4 flex min-h-[445px] items-center justify-center overflow-hidden rounded-[18px] lg:mx-auto lg:min-h-0 lg:rounded-none lg:px-[var(--pad)] lg:py-[88px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/splash.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-[1] mx-4 my-[26px] rounded-[18px] bg-forest px-[22px] pb-[30px] pt-[26px] text-white lg:m-0 lg:grid lg:w-full lg:grid-cols-[500px_1fr] lg:items-start lg:gap-x-[63px] lg:rounded-[20px] lg:py-[38px] lg:pl-[63px] lg:pr-[55px]">
          <h3 className="display m-0 text-[22px] leading-[1.12] text-sky lg:mb-0 lg:text-[38px] lg:leading-[1.16]">
            {t.whySplashTitle}
          </h3>
          <p className="m-0 mt-4 text-justify text-[15px] leading-[1.6] lg:mt-0 lg:text-[19px] lg:leading-[1.55]">
            {t.whySplashBody}
          </p>
        </div>
      </div>

      <div className="hscroll frame mt-[26px] px-4 pb-1.5 lg:mt-[92px] lg:grid lg:grid-cols-4 lg:gap-[31px] lg:overflow-visible lg:px-[var(--pad)]">
        {cards.map((card, i) => (
          <article
            key={i}
            className={`flex min-h-[240px] w-[212px] flex-col rounded-[16px] px-[18px] pb-6 pt-5 lg:min-h-[340px] lg:w-auto lg:rounded-[18px] lg:px-[34px] lg:pb-[34px] lg:pt-[26px] ${
              card.tone === "lime" ? "bg-pale" : "bg-mint"
            } ${card.desktopOnly ? "hidden lg:flex" : ""}`}
          >
            <div className="flex h-[52px] items-start justify-end lg:h-[76px]">
              {card.icon}
            </div>
            <h4 className="display mb-2.5 mt-3.5 text-[19px] leading-[1.13] lg:mb-4 lg:mt-[26px] lg:text-[26px]">
              {card.title}
            </h4>
            <p className="m-0 text-sm leading-[1.5] lg:text-[17px] lg:leading-[1.45]">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
