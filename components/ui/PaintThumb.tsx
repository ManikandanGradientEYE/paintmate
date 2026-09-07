"use client";

import { useState } from "react";

/** Small paint thumbnail with a bucket-icon fallback. Used in the admin editor. */
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
        style={{
          ...style,
          background: "#fff url(/assets/bucket.png) center/60% auto no-repeat",
        }}
        className="shrink-0 rounded-lg border border-line"
        aria-hidden="true"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      onError={() => setBroken(true)}
      className="shrink-0 rounded-lg border border-line object-cover"
    />
  );
}
