/**
 * Figma → CSS placement for rotated elements.
 *
 * Figma's X / Y (shown as Left / Top in the properties panel) describe the element's
 * ROTATED bounding box. CSS `left` / `top` place the UNROTATED box, which `transform:
 * rotate()` then spins about its centre. For a rotated element those are different
 * numbers, so pasting Figma's values straight into CSS shifts the element.
 *
 * Rotating a w x h box by θ grows its bounding box to:
 *   bw = w·|cos θ| + h·|sin θ|
 *   bh = w·|sin θ| + h·|cos θ|
 * and the element's centre stays put, so CSS left/top need half that growth added back.
 *
 * With rotation 0 the correction is 0, so unrotated values pass through untouched.
 */
export interface FigmaBox {
  /** Figma "Width" */
  width: number;
  /** Figma "Height" */
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

export interface CssBox {
  width: number;
  height: number;
  left: number;
  top: number;
  rotation: number;
  opacity: number;
}

/** Converts Figma properties-panel values into CSS left/top (rotation about centre). */
export function figmaToCss(box: FigmaBox): CssBox {
  const { width, height, left, top } = box;
  const rotation = box.rotation ?? 0;
  const opacity = (box.opacity ?? 100) / 100;

  const rad = (rotation * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));

  const boundingWidth = width * cos + height * sin;
  const boundingHeight = width * sin + height * cos;

  return {
    width,
    height,
    rotation,
    opacity,
    left: left + (boundingWidth - width) / 2,
    top: top + (boundingHeight - height) / 2,
  };
}
