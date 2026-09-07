"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";

const SOCIALS = [
  {
    label: "Facebook",
    path: "M12 2a10 10 0 1 0-1.2 19.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z",
  },
  {
    label: "Instagram",
    path: "",
  },
  {
    label: "LinkedIn",
    path: "",
  },
  {
    label: "Twitter",
    path: "M22 5.9c-.7.3-1.5.6-2.4.7a4.1 4.1 0 0 0 1.8-2.3c-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z",
  },
];

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-[110px] lg:mt-[300px]">
      <div
        className="w-full bg-forest [aspect-ratio:1440/145]"
        style={{
          background: "url(/assets/footer-edge.png) center top/100% 100% no-repeat",
        }}
      />
      <div className="bg-forest">
        <div className="frame pad-x pb-7 lg:pb-[26px]">
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 lg:pt-7">
            <span className="flex items-center gap-[9px]">
              <span className="block lg:hidden">
                <Logo width={34} height={38} variant="outline" />
              </span>
              <span className="hidden lg:block">
                <Logo width={76} height={84} variant="outline" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[21px] font-extrabold tracking-[-0.02em] text-white lg:text-[46px]">
                  Paint Mate
                </span>
                <span className="mt-[3px] text-[6.5px] font-semibold uppercase tracking-[0.19em] text-white/85 lg:mt-1.5 lg:text-[12px] lg:tracking-[0.22em]">
                  {t.brandTagline}
                </span>
              </span>
            </span>

            <div className="ml-auto">
              <div className="mb-3 text-right text-sm text-white lg:mb-3.5 lg:text-[18px]">
                {t.footerConnect}
              </div>
              <div className="flex justify-end gap-4 lg:gap-[22px]">
                {SOCIALS.map((s) => (
                  <span key={s.label} aria-label={s.label} className="block">
                    {s.label === "Instagram" ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#B3C341"
                        strokeWidth="2"
                        className="lg:h-7 lg:w-7"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1.2" fill="#B3C341" stroke="none" />
                      </svg>
                    ) : s.label === "LinkedIn" ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="#B3C341"
                        className="lg:h-7 lg:w-7"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="4" />
                        <path
                          d="M7.2 9.6h2.3V18H7.2zM8.35 6.2a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7zM11.4 9.6h2.2v1.2c.3-.6 1.1-1.3 2.4-1.3 2 0 2.8 1.2 2.8 3.4V18h-2.3v-4.5c0-1.1-.4-1.8-1.4-1.8-.8 0-1.3.5-1.5 1.1-.1.2-.1.5-.1.8V18h-2.3z"
                          fill="#28462E"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="#B3C341"
                        className="lg:h-7 lg:w-7"
                      >
                        <path d={s.path} />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-6 lg:mt-[34px]">
            <div className="text-[17px] leading-snug text-white lg:text-[23px]">
              <i className="block font-extrabold not-italic text-lime">
                {t.footerVenture}
              </i>
              {t.footerMade}
            </div>
            <Link href="/shop" className="quote-brush">
              <span>{t.getAQuote}</span>
            </Link>
          </div>

          <hr className="my-5 border-white/25 lg:mb-[18px] lg:mt-7" />
          <p className="text-[13px] leading-relaxed text-white/85 lg:text-base">
            {t.footerRights}
            <br />
            {t.footerFine}
          </p>
        </div>
      </div>
    </footer>
  );
}
