import type { BlobPlacement } from "@/lib/figmaBox";

/* ------------------------------------------------------------------------------
 * HERO BLOB POSITION — the cream blob behind both hero banners, on the home page
 * and on /shop. One definition so the two stay identical: edit here to move both.
 *
 * These are plain CSS values: exactly what devtools shows on `.pm-blob`. So the
 * quickest way to reposition it is to inspect the blob, drag the numbers live in
 * devtools until it looks right, then paste them back here.
 *
 *   left / top  →  negative moves it further off the left / top edge
 *   rotation    →  degrees, negative turns anticlockwise
 *   opacity     →  0–1
 *   flipX       →  true mirrors it left-to-right, flipY top-to-bottom
 *   scaleX / Y  →  explicit stretch, e.g. 2; wins over the flips
 *
 * The mirror is applied before the rotation, so flipping does not change the angle
 * you asked for. To try it in devtools instead, set --blob-sx-lg (or --blob-sx on
 * mobile) to -1.
 *
 * Pasting from Figma's properties panel instead? Wrap the values in fromFigma():
 *
 *   const HERO_BLOB_DESKTOP = fromFigma({
 *     width: 481.25, height: 539.32, left: -151, top: -112,
 *     rotation: -148.45, opacity: 50,   // opacity in percent, as Figma shows it
 *   });
 *
 * Figma's Left/Top describe the ROTATED bounding box, so they need converting before
 * they work as CSS — fromFigma() does that. Don't mix the two: values that came out
 * of devtools are already converted.
 *
 * Both heroes clip whatever falls outside them, so the blob can hang off the edge.
 * ------------------------------------------------------------------------------ */
export const HERO_BLOB_DESKTOP: BlobPlacement = {
  width: 481.25,
  height: 539.32,
  left: -20.47,
  top: -197.95,
  rotation: -38.45,
  opacity: 0.5,
  flipX: true,
};

export const HERO_BLOB_MOBILE: BlobPlacement = {
  width: 190,
  height: 300,
  left: -25,
  top: -105,
  rotation: -38.45,
  opacity: 0.85,
  flipX: true,
};
