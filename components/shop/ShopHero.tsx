"use client";

import FigmaBlob from "@/components/site/FigmaBlob";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_BLOB_DESKTOP, HERO_BLOB_MOBILE } from "@/lib/blobs";

function IconDelivery() {
  return (
    <svg width="30" height="24" viewBox="0 0 34 26" fill="#B3C341" aria-hidden="true" className="shrink-0 lg:h-[46px] lg:w-[56px] lg:self-end">
      <rect x="1" y="3" width="19" height="16" rx="3" />
      <path d="M20 7h5l6 6v6H20V7z" />
      <circle cx="9" cy="22" r="3.4" />
      <circle cx="26" cy="22" r="3.4" />
      <path
        d="M6 10l3 3 6-6"
        stroke="#FFFBF1"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShade() {
  return (
    <svg width="30" height="26" viewBox="0 0 34 30" fill="#B3C341" aria-hidden="true" className="shrink-0 lg:h-[46px] lg:w-[56px] lg:self-end">
      <rect x="1" y="2" width="18" height="8" rx="1.6" />
      <path d="M19 4h7a2.4 2.4 0 0 1 2.4 2.4v3.2A2.4 2.4 0 0 1 26 12h-7V9.6h6V6.4h-6V4z" />
      <rect x="3" y="12.5" width="2.4" height="8" rx="1.2" />
      <rect x="7.5" y="12.5" width="2.4" height="6" rx="1.2" />
      <rect x="12" y="12.5" width="2.4" height="9" rx="1.2" />
      <rect x="18.4" y="12.5" width="2.4" height="6.5" rx="1.2" />
      <rect x="17.6" y="20" width="4" height="9" rx="2" />
    </svg>
  );
}

export default function ShopHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-[38px] lg:pt-[150px]">
      {/* the home page's hero blob, shared so both banners match */}
      <FigmaBlob desktop={HERO_BLOB_DESKTOP} mobile={HERO_BLOB_MOBILE} />

      <h1 className="display relative text-center text-[38px] leading-[1.05] lg:text-[56px] lg:leading-[1.1]">
        {t.shopHeroTitle}{" "}
        <span className="block text-lime lg:inline">{t.shopHeroTitleAccent}</span>
      </h1>
      <p className="relative mx-4 mt-3.5 text-center text-base leading-[1.4] lg:mx-auto lg:mt-[22px] lg:max-w-[640px] lg:text-[27px]">
        {t.shopHeroLead}{" "}
        <b className="font-extrabold italic">{t.shopHeroLeadBold}</b>
      </p>

      <div className="hscroll pad-x mt-[26px] lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-[22px] lg:overflow-visible lg:px-0 lg:pt-[76px]">
        {[
          { src: "/assets/factory.jpg", alt: "Jiwan Paints facility" },
          { src: "/assets/bedroom.jpg", alt: "Painted bedroom" },
          { src: "/assets/living.jpg", alt: "Painted living and dining room" },
        ].map((shot) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            className="h-[196px] w-[277px] rounded object-cover lg:h-[325px] lg:w-full lg:rounded-none"
          />
        ))}
      </div>

      <div className="frame pad-x mt-[22px] lg:mt-0 lg:grid lg:grid-cols-[397px_1fr] lg:items-start lg:gap-x-[100px] lg:pt-[88px]">
        <p className="m-0 text-justify text-[15px] leading-[1.7] lg:text-[19px] lg:leading-[1.5]">
          {t.shopIntroBody}
        </p>

        <div className="mt-[26px] lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="mb-3.5 flex items-center gap-3.5 rounded-xl bg-pale px-4 py-3 text-[14.5px] font-extrabold italic leading-[1.35] lg:m-0 lg:min-h-[240px] lg:flex-col lg:items-start lg:justify-end lg:gap-9 lg:px-[30px] lg:py-[26px] lg:text-[21px] lg:leading-tight">
            <IconDelivery />
            {t.heroBadgeDelivery}
          </div>
          <div className="flex items-center gap-3.5 rounded-xl bg-mint px-4 py-3 text-[14.5px] font-extrabold italic leading-[1.35] lg:m-0 lg:min-h-[240px] lg:flex-col lg:items-start lg:justify-end lg:gap-9 lg:px-[30px] lg:py-[26px] lg:text-[21px] lg:leading-tight">
            <IconShade />
            {t.heroBadgeShadeMatching}
          </div>
        </div>
      </div>
    </section>
  );
}
