"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function StepIcon({ index }: { index: number }) {
  if (index === 0)
    return (
      <svg width="52" height="56" viewBox="0 0 52 56" fill="#fff" aria-hidden="true">
        <path d="M10 8h20l12 12v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
        <rect x="15" y="36" width="22" height="3" rx="1.5" fill="#B3C341" />
        <rect x="15" y="43" width="14" height="3" rx="1.5" fill="#B3C341" />
        <path d="M35 2l6 6-16 16-8 2 2-8L35 2z" fill="#fff" stroke="#B3C341" strokeWidth="1.6" />
      </svg>
    );
  if (index === 1)
    return (
      <svg width="52" height="56" viewBox="0 0 52 56" fill="#fff" aria-hidden="true">
        <rect x="6" y="4" width="40" height="48" rx="5" />
        <rect x="12" y="10" width="28" height="10" rx="2" fill="#9DCCD6" />
        <g fill="#9DCCD6">
          <path d="M16 26h7v2.4h-7zM18.2 23.8h2.6v7h-2.6z" />
          <path d="M29 26h7v2.4h-7z" />
          <path d="M16.6 35.4l1.7-1.7 4.6 4.6-1.7 1.7zM21.2 33.7l1.7 1.7-4.6 4.6-1.7-1.7z" />
          <path d="M29 35h7v2.2h-7zM29 39.4h7v2.2h-7z" />
        </g>
      </svg>
    );
  if (index === 2)
    return (
      <svg width="52" height="56" viewBox="0 0 52 56" fill="#fff" aria-hidden="true">
        <rect x="26" y="6" width="18" height="16" rx="2" />
        <rect x="26" y="26" width="9" height="9" rx="1.6" />
        <path d="M8 10v24l5.6-5.6 4.4 10 5.4-2.4-4.5-9.8 7.4-.6L8 10z" />
      </svg>
    );
  return (
    <svg width="58" height="56" viewBox="0 0 58 56" fill="#fff" aria-hidden="true">
      <rect x="4" y="14" width="30" height="24" rx="4" />
      <path d="M34 20h9l9 9v9h-18V20z" />
      <circle cx="16" cy="42" r="5.4" />
      <circle cx="42" cy="42" r="5.4" />
      <path
        d="M12 25l4.5 4.5L26 20"
        stroke="#B3C341"
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Journey() {
  const { t } = useLanguage();

  const steps = [
    { num: "01", label: t.step1Label, body: t.step1Body, bg: "bg-lime text-forest" },
    { num: "02", label: t.step2Label, body: t.step2Body, bg: "bg-sky text-forest" },
    { num: "03", label: t.step3Label, body: t.step3Body, bg: "bg-forest text-white" },
    { num: "04", label: t.step4Label, body: t.step4Body, bg: "bg-lime text-forest" },
  ];

  return (
    <section className="blob frame relative overflow-hidden px-4 pt-[46px] lg:px-[var(--pad)] lg:pt-[200px] [&::before]:right-[-70px] [&::before]:bottom-20 [&::before]:h-[300px] [&::before]:w-[210px] [&::before]:opacity-70 lg:[&::before]:right-0 lg:[&::before]:bottom-[180px] lg:[&::before]:h-[560px] lg:[&::before]:w-[430px] lg:[&::before]:opacity-50">
      <h2 className="display sec-title relative">{t.journeyTitle}</h2>
      <p className="relative mb-8 mt-2 text-center text-base lg:mb-11 lg:mt-3 lg:text-[22px]">
        {t.journeyLead}
      </p>

      <div className="hscroll relative -mx-4 px-4 pb-1.5 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-10 lg:overflow-visible lg:px-0">
        {steps.map((step, i) => (
          // On mobile the card is a stack: two tilted layers peek out behind it.
          // The desktop grid drops the layers and squares the card up.
          <article
            key={step.num}
            className="relative w-[296px] pb-[9px] pl-[7px] pr-[9px] pt-[6px] lg:w-auto lg:p-0"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-[9px] left-[7px] right-[9px] top-[6px] -translate-x-[7px] -translate-y-[6px] -rotate-[2.2deg] rounded-[22px] bg-sky lg:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[9px] left-[7px] right-[9px] top-[6px] translate-x-[9px] translate-y-[9px] rotate-[.6deg] rounded-[22px] bg-forest lg:hidden"
            />
            <div
              className={`relative flex min-h-[250px] -rotate-1 flex-col rounded-[22px] px-6 pb-7 pt-[26px] lg:min-h-[300px] lg:rotate-0 lg:rounded-[16px] lg:p-[46px] ${step.bg}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="display text-[34px] leading-[.92] text-white lg:text-[46px]">
                    {step.num}
                  </div>
                  <div className="display mt-0.5 text-xl leading-none text-white lg:mt-1 lg:text-[26px]">
                    {step.label}
                  </div>
                </div>
                <div className="mt-0.5 shrink-0 lg:origin-top-right lg:scale-125">
                  <StepIcon index={i} />
                </div>
              </div>
              <p className="mt-5 text-[14.5px] leading-[1.5] lg:mt-[34px] lg:text-[19px] lg:leading-[1.42]">
                {step.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="relative mt-9 text-center lg:mt-20">
        <Link
          href="/shop"
          className="inline-block rounded-pill bg-forest px-9 py-4 text-base font-extrabold uppercase tracking-wide text-white lg:px-12 lg:py-[22px] lg:text-[22px]"
        >
          {t.getAQuote}
        </Link>
      </div>
    </section>
  );
}
