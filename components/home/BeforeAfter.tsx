"use client";

import { useCallback, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/** Drag-to-compare before/after slider from the Figma home frame. */
export default function BeforeAfter() {
  const { t } = useLanguage();
  const frameRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <section
      ref={frameRef}
      className="relative select-none overflow-hidden bg-[#ddd] [aspect-ratio:360/543] [touch-action:pan-y] lg:h-[502px] lg:[aspect-ratio:auto]"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => setFromClientX(e.touches[0]!.clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0]!.clientX)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/after.jpg"
        alt="Staircase after painting"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pct}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/before.jpg"
          alt="Staircase before painting"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: "100vw", maxWidth: "none" }}
          draggable={false}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[11%] z-[2] px-[60px] text-center text-base font-bold leading-snug text-white [text-shadow:0_1px_8px_rgba(0,0,0,.28)] lg:top-[96px] lg:px-[120px] lg:text-[30px]">
        {t.baLabel}
      </div>

      <div
        className="absolute bottom-0 top-0 z-[3] w-0.5 -translate-x-px bg-white"
        style={{ left: `${pct}%` }}
      >
        <span className="absolute left-1/2 top-[7%] flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white lg:top-[56px]">
          <span className="h-[11px] w-[11px] rounded-full bg-forest" />
        </span>
      </div>
    </section>
  );
}
