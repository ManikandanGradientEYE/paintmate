"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Reviews() {
  const { t } = useLanguage();
  const tilts = ["lg:-rotate-[1.4deg]", "lg:rotate-[.5deg]", "lg:rotate-[1.4deg]"];

  return (
    <section className="blob frame relative overflow-hidden pt-[46px] lg:px-[var(--pad)] lg:pt-[200px] [&::before]:right-[-70px] [&::before]:top-16 [&::before]:h-[300px] [&::before]:w-[210px] [&::before]:opacity-70 lg:[&::before]:right-0 lg:[&::before]:top-[150px] lg:[&::before]:h-[560px] lg:[&::before]:w-[460px] lg:[&::before]:opacity-50">
      <h2 className="display sec-title relative mb-6 lg:mb-[76px]">{t.reviewsTitle}</h2>

      <div className="hscroll relative px-4 pb-1.5 lg:grid lg:grid-cols-3 lg:items-start lg:gap-[47px] lg:overflow-visible lg:px-0">
        {tilts.map((tilt, i) => (
          <article
            key={i}
            className={`w-[280px] rounded-[16px] bg-mint p-6 lg:w-auto lg:rounded-[18px] lg:px-[34px] lg:pb-10 lg:pt-[34px] ${tilt}`}
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
