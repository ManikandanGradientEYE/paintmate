import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paint Mate design system (from the Figma / UI_UX_changes handoff)
        cream: "#FFFBF1",
        header: "#FFFDF9",
        forest: {
          DEFAULT: "#28462E",
          dark: "#1E3524",
        },
        lime: {
          DEFAULT: "#B3C341",
          brush: "#B5BF4C",
        },
        pale: {
          DEFAULT: "#E9EAC0",
          2: "#E8ECC5",
        },
        mint: "#E2EDE9",
        sand: "#F0E4D0",
        sky: "#9DCCD6",
        ink: {
          DEFAULT: "#000000",
          muted: "#6E6E6E",
          faint: "#8A8A8A",
        },
        line: "#DCDCD2",
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-body)", "Plus Jakarta Sans", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
      },
      maxWidth: {
        frame: "1440px",
        content: "1240px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(40,70,46,.06)",
      },
      keyframes: {
        slide: { to: { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee: "slide 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
