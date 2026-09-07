"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SWATCHES = ["#CFBCC3", "#FF7D7D", "#DFDD93", "#C1AB00", "#F5E9CC"];

export default function ColourExperience() {
  const { t } = useLanguage();
  const [room, setRoom] = useState(0);
  const [swatch, setSwatch] = useState(1);

  const rooms = [
    { label: t.roomLiving, dot: "#B3C341" },
    { label: t.roomKitchen, dot: "#FF994C" },
    { label: t.roomKids, dot: "#FF994C" },
    { label: t.roomBed, dot: "#FFDB79" },
  ];

  return (
    <section className="frame px-4 pt-[46px] lg:grid lg:grid-cols-[525px_1fr] lg:items-start lg:gap-x-[59px] lg:px-[var(--pad)] lg:pt-[190px]">
      <h2 className="display sec-title mb-4 lg:col-start-1 lg:mb-[22px] lg:text-left lg:text-[34px]">
        {t.colourTitle}
      </h2>
      <p className="m-0 mb-6 text-center text-[15px] leading-[1.6] lg:col-start-1 lg:mb-[34px] lg:text-left lg:text-[19px] lg:leading-[1.5]">
        {t.colourBody}
      </p>

      <div className="hscroll -mx-4 px-4 lg:col-start-1 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0">
        {rooms.map((r, i) => (
          <button
            key={r.label}
            type="button"
            role="tab"
            aria-selected={room === i}
            onClick={() => setRoom(i)}
            className={`flex items-center gap-2 rounded-pill border px-5 py-2.5 text-sm font-semibold transition lg:w-full lg:justify-start lg:px-[26px] lg:py-3.5 lg:text-xl ${
              room === i ? "border-forest bg-pale text-forest" : "border-line text-ink-muted"
            }`}
          >
            <span
              className="h-2 w-2 rounded-full lg:h-[11px] lg:w-[11px]"
              style={{ background: r.dot }}
            />
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-5 h-[230px] overflow-hidden rounded-xl lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:h-[462px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/room.jpg"
          alt="Room painted in the selected shade"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-5 flex gap-3 lg:col-start-1 lg:gap-3.5 lg:pt-9">
        {SWATCHES.map((hex, i) => (
          <button
            key={hex}
            type="button"
            aria-pressed={swatch === i}
            aria-label={`Shade ${hex}`}
            onClick={() => setSwatch(i)}
            className={`h-9 flex-1 rounded-[10px] border-2 transition lg:h-11 lg:max-w-[114px] lg:rounded-[11px] ${
              swatch === i ? "border-forest" : "border-transparent"
            } ${i === 4 ? "lg:hidden" : ""}`}
            style={{ background: hex }}
          />
        ))}
      </div>
    </section>
  );
}
