"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function Shot({
  src,
  tag,
  className = "",
}: {
  src: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div className={`relative h-[270px] w-[179px] shrink-0 overflow-hidden lg:h-[510px] lg:w-auto ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
      {tag && (
        <span className="absolute bottom-2.5 left-2.5 z-[2] rounded-pill bg-forest-dark/70 px-3.5 py-1.5 text-[13px] leading-none text-white backdrop-blur-[2px] lg:hidden">
          {tag}
        </span>
      )}
    </div>
  );
}

export default function OurWork() {
  const { t } = useLanguage();

  return (
    <section className="blob relative overflow-hidden pt-[46px] lg:pt-[132px] [&::before]:right-[-70px] [&::before]:top-1.5 [&::before]:h-[300px] [&::before]:w-[210px] [&::before]:scale-x-[-1] [&::before]:opacity-80 lg:[&::before]:right-0 lg:[&::before]:top-20 lg:[&::before]:h-[560px] lg:[&::before]:w-[420px] lg:[&::before]:opacity-50">
      <h2 className="display sec-title relative mb-5 lg:mb-[52px]">{t.workTitle}</h2>

      <div className="flex gap-0.5 overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-[337fr_338fr_765fr] lg:overflow-visible">
        <Shot src="/assets/work1.jpg" tag={t.workTagLocation} />
        <Shot src="/assets/work2.jpg" tag={t.workTagLocation} />
        <Shot src="/assets/bedroom.jpg" tag={t.workTagLocation} className="lg:hidden" />
        <Shot src="/assets/villa.jpg" className="hidden lg:block" />
      </div>

      <div className="hidden lg:grid lg:grid-cols-[900fr_340fr_200fr]">
        <Shot src="/assets/norbu.jpg" />
        <Shot src="/assets/work1.jpg" />
        <Shot src="/assets/work2.jpg" />
      </div>

      <div className="relative h-[196px] overflow-hidden lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/villa.jpg" alt="" className="h-full w-full object-cover" />
        <span className="absolute bottom-3 right-3.5 z-[2] rounded-pill bg-forest-dark/70 px-3.5 py-1.5 text-[13px] leading-none text-white">
          {t.workTagVilla}
        </span>
      </div>
      <div className="relative h-[196px] overflow-hidden lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/norbu.jpg" alt="" className="h-full w-full object-cover" />
        <span className="absolute bottom-3 left-3.5 z-[2] rounded-pill bg-forest-dark/70 px-3.5 py-1.5 text-[13px] leading-none text-white">
          {t.workTagNorbu}
        </span>
      </div>

      <div className="mt-9 text-center lg:mt-20">
        <Link
          href="/shop"
          className="inline-block rounded-pill bg-forest px-9 py-4 text-base font-extrabold uppercase tracking-wide text-white lg:px-12 lg:py-[22px] lg:text-[22px]"
        >
          {t.workViewGallery}
        </Link>
      </div>
    </section>
  );
}
