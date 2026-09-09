import type { CSSProperties } from "react";
import type { BlobPlacement } from "@/lib/figmaBox";

/**
 * A decorative image positioned by plain CSS numbers — the same values devtools shows
 * on `.pm-blob`, so a blob can be nudged live in the browser and the result pasted
 * straight back into the caller.
 *
 * Coming from Figma instead? Wrap the properties-panel values in `fromFigma()`, which
 * applies the rotated bounding-box correction (see lib/figmaBox.ts).
 *
 * The parent must be `relative`, and usually `overflow-hidden` so the blob is clipped
 * at the section edge rather than causing a horizontal scrollbar.
 */
export default function FigmaBlob({
  desktop,
  mobile,
  src = "/assets/blob-cream.png",
  className = "",
}: {
  /** used at >= 1024px */
  desktop: BlobPlacement;
  /** used below 1024px; falls back to `desktop` */
  mobile?: BlobPlacement;
  src?: string;
  className?: string;
}) {
  const m = mobile ?? desktop;

  const style = {
    "--blob-image": `url(${src})`,
    "--blob-w": `${m.width}px`,
    "--blob-h": `${m.height}px`,
    "--blob-x": `${m.left}px`,
    "--blob-y": `${m.top}px`,
    "--blob-rot": `${m.rotation}deg`,
    "--blob-sx": m.flipX ? "-1" : "1",
    "--blob-sy": m.flipY ? "-1" : "1",
    "--blob-op": `${m.opacity}`,
    "--blob-w-lg": `${desktop.width}px`,
    "--blob-h-lg": `${desktop.height}px`,
    "--blob-x-lg": `${desktop.left}px`,
    "--blob-y-lg": `${desktop.top}px`,
    "--blob-rot-lg": `${desktop.rotation}deg`,
    "--blob-sx-lg": desktop.flipX ? "-1" : "1",
    "--blob-sy-lg": desktop.flipY ? "-1" : "1",
    "--blob-op-lg": `${desktop.opacity}`,
  } as CSSProperties;

  return <span aria-hidden="true" className={`pm-blob ${className}`} style={style} />;
}
