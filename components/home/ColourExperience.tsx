"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ColourRoom } from "@/types";

export default function ColourExperience({ rooms }: { rooms: ColourRoom[] }) {
  const { t } = useLanguage();
  const [roomIndex, setRoomIndex] = useState(0);
  const [swatchIndex, setSwatchIndex] = useState(0);

  if (rooms.length === 0) return null;

  const room = rooms[Math.min(roomIndex, rooms.length - 1)]!;
  const swatches = room.swatches;
  const active = swatches[Math.min(swatchIndex, Math.max(swatches.length - 1, 0))];

  return (
    <section className="frame px-4 pt-[46px] lg:grid lg:grid-cols-[525px_1fr] lg:items-start lg:gap-x-[59px] lg:px-[var(--pad)] lg:pt-[190px]">
      <h2 className="display sec-title mb-4 lg:col-start-1 lg:mb-[22px] lg:text-left lg:text-[34px]">
        {t.colourTitle}
      </h2>
      <p className="m-0 mb-6 text-center text-[15px] leading-[1.6] lg:col-start-1 lg:mb-[34px] lg:text-left lg:text-[19px] lg:leading-[1.5]">
        {t.colourBody}
      </p>

      <div
        className="hscroll -mx-4 px-4 lg:col-start-1 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0"
        role="tablist"
      >
        {rooms.map((r, i) => {
          const on = i === roomIndex;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setRoomIndex(i);
                setSwatchIndex(0);
              }}
              className={`flex items-center gap-2 rounded-pill border px-5 py-2.5 text-sm font-semibold transition lg:w-full lg:justify-start lg:px-[26px] lg:py-3.5 lg:text-xl ${
                on ? "border-forest bg-pale text-forest" : "border-line text-ink-muted"
              }`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full lg:h-[11px] lg:w-[11px]"
                style={{ background: r.swatches[0]?.hex ?? "#DDD" }}
              />
              {r.name}
            </button>
          );
        })}
      </div>

      {/* the chosen colour is painted behind the room's transparent PNG */}
      <div
        className="mt-5 h-[230px] overflow-hidden rounded-xl transition-colors duration-300 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:h-[462px]"
        style={{ backgroundColor: active?.hex ?? "#E7E4DC" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={room.imageUrl}
          alt={`${room.name} preview`}
          className="h-full w-full object-cover"
        />
      </div>

      {swatches.length > 0 && (
        <div className="mt-5 flex gap-3 lg:col-start-1 lg:gap-3.5 lg:pt-9">
          {swatches.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === swatchIndex}
              aria-label={`Shade ${s.hex}`}
              onClick={() => setSwatchIndex(i)}
              className={`h-9 flex-1 rounded-[10px] border-2 transition lg:h-11 lg:max-w-[114px] lg:rounded-[11px] ${
                i === swatchIndex ? "border-forest" : "border-transparent"
              }`}
              style={{ background: s.hex }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
