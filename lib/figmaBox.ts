/**
 * Placement for the decorative blobs.
 *
 * `BlobPlacement` is plain CSS: exactly the numbers the browser shows for `.pm-blob`
 * in devtools. Tweak a blob live in devtools, then paste the values straight back into
 * the component — no conversion in either direction.
 *
 * `fromFigma()` exists for the other direction. Figma's X / Y (its Left / Top) describe
 * the element's ROTATED bounding box, whereas CSS left / top place the UNROTATED box
 * that `transform: rotate()` then spins about its centre. For a rotated element those
 * are different numbers, so Figma's values need correcting before they become CSS.
 *
 * Rotating a w x h box by θ grows its bounding box to:
 *   bw = w·|cos θ| + h·|sin θ|
 *   bh = w·|sin θ| + h·|cos θ|
 * and the centre stays put, so left / top gain half that growth.
 * With rotation 0 the correction is 0 and values pass through untouched.
 */
export interface BlobPlacement {
  width: number;
  height: number;
  /** CSS left, in px */
  left: number;
  /** CSS top, in px */
  top: number;
  /** degrees; negative turns anticlockwise */
  rotation: number;
  /** 0–1, as CSS opacity */
  opacity: number;
  /** mirror horizontally (scaleX(-1)) */
  flipX?: boolean;
  /** mirror vertically (scaleY(-1)) */
  flipY?: boolean;
}

/** Values as they appear in Figma's properties panel. */
export interface FigmaBox {
  width: number;
  height: number;
  /** Figma "Left" — of the rotated bounding box */
  left: number;
  /** Figma "Top" — of the rotated bounding box */
  top: number;
  /** Figma "Rotation", in degrees. Default 0. */
  rotation?: number;
  /** Figma "Opacity" as a percentage, e.g. 50. Default 100. */
  opacity?: number;
}

/** Converts Figma properties-panel values into CSS placement. */
export function fromFigma(box: FigmaBox & { flipX?: boolean; flipY?: boolean }): BlobPlacement {
  const { width, height, left, top } = box;
  const rotation = box.rotation ?? 0;

  const rad = (rotation * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));

  const boundingWidth = width * cos + height * sin;
  const boundingHeight = width * sin + height * cos;

  return {
    width,
    height,
    rotation,
    opacity: (box.opacity ?? 100) / 100,
    left: left + (boundingWidth - width) / 2,
    top: top + (boundingHeight - height) / 2,
    flipX: box.flipX,
    flipY: box.flipY,
  };
}
