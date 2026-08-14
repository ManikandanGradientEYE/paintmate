"use client";

import { useState } from "react";

export default function PaintThumb({
  src,
  alt,
  size = 36,
}: {
  src?: string | null;
  alt: string;
  size?: number;
}) {
  const [broken, setBroken] = useState(false);
  const style = { width: size, height: size };

  if (!src || broken) {
    return (
      <span
        style={style}
        className="flex shrink-0 items-center justify-center rounded-lg bg-tan text-ink-faint"
        aria-hidden="true"
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20c0-3 2-4 2-7a6 6 0 1 1 12 0c0 3 2 4 2 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      onError={() => setBroken(true)}
      className="shrink-0 rounded-lg object-cover"
    />
  );
}
