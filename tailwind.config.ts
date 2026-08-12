import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF3E6",
          card: "#FFFFFF",
        },
        forest: {
          DEFAULT: "#1F3D24",
          dark: "#16301B",
          light: "#2C4F32",
        },
        olive: {
          DEFAULT: "#8FA23A",
          light: "#EAF0D9",
        },
        brand: {
          pink: "#E01267",
        },
        tan: {
          DEFAULT: "#EFE2CC",
          dark: "#E4D3B4",
        },
        sky: {
          DEFAULT: "#CDE7F0",
        },
        rose: {
          DEFAULT: "#F7CFDD",
        },
        ink: {
          DEFAULT: "#2A2A26",
          muted: "#6B6B62",
          faint: "#9A9A8F",
        },
        line: "#E7DFD0",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
