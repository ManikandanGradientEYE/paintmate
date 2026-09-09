import type { CSSProperties } from "react";
import { figmaToCss, type FigmaBox } from "@/lib/figmaBox";

/**
 * A decorative image positioned with numbers copied straight from Figma's properties
 * panel. Paste Width / Height / Left / Top / Rotation / Opacity as-is — the rotated
 * bounding-box correction is applied for you (see lib/figmaBox.ts).
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
  /** values from the 1440px Figma frame — used at >= 1024px */
  desktop: FigmaBox;
  /** values from the mobile frame — used below 1024px. Falls back to `desktop`. */
  mobile?: FigmaBox;
  src?: string;
  className?: string;
}) {
  const d = figmaToCss(desktop);
  const m = figmaToCss(mobile ?? desktop);

  const style = {
    "--blob-image": `url(${src})`,
    "--blob-w": `${m.width}px`,
    "--blob-h": `${m.height}px`,
    "--blob-x": `${m.left}px`,
    "--blob-y": `${m.top}px`,
    "--blob-rot": `${m.rotation}deg`,
    "--blob-op": `${m.opacity}`,
    "--blob-w-lg": `${d.width}px`,
    "--blob-h-lg": `${d.height}px`,
    "--blob-x-lg": `${d.left}px`,
    "--blob-y-lg": `${d.top}px`,
    "--blob-rot-lg": `${d.rotation}deg`,
    "--blob-op-lg": `${d.opacity}`,
  } as CSSProperties;

  return <span aria-hidden="true" className={`pm-blob ${className}`} style={style} />;
}
