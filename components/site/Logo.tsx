const PETAL =
  "M20 38.5c-4.4-6.4-6-16-5-23.4C15.6 10.8 17.9 9 20 9s4.4 1.8 5 6.1c1 7.4-.6 17-5 23.4z";
const STEM =
  "M20 40c-5-7-6.9-17.8-5.7-26C15 8.6 17.7 6.6 20 6.6s5 2 5.7 7.4C26.9 22.2 25 33 20 40z";

/** The Paint Mate brush-fan mark, straight from the Figma export. */
export default function Logo({
  width = 38,
  height = 42,
  variant = "colour",
}: {
  width?: number;
  height?: number;
  variant?: "colour" | "outline";
}) {
  if (variant === "outline") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 44"
        fill="#fff"
        stroke="#28462E"
        strokeWidth="1.1"
        aria-hidden="true"
      >
        <path d={PETAL} transform="rotate(-58 20 38)" />
        <path d={PETAL} transform="rotate(-38 20 38)" />
        <path d={PETAL} transform="rotate(-19 20 38)" />
        <path d={STEM} transform="rotate(2 20 38)" />
        <circle cx="20.4" cy="35.6" r="1.9" fill="#28462E" stroke="none" />
      </svg>
    );
  }

  return (
    <svg width={width} height={height} viewBox="0 0 40 44" aria-hidden="true">
      <path d={PETAL} fill="#EFE3CE" transform="rotate(-58 20 38)" />
      <path d={PETAL} fill="#9DCCD6" transform="rotate(-38 20 38)" />
      <path d={PETAL} fill="#B3C341" transform="rotate(-19 20 38)" />
      <path d={STEM} fill="#28462E" transform="rotate(2 20 38)" />
      <circle cx="20.4" cy="35.6" r="1.9" fill="#fff" />
    </svg>
  );
}
