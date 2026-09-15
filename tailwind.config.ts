import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      colors: {
        bg: "#FBF7EF",
        bg2: "#F4EEE0",
        ink: "#1A1A1A",
        ink2: "#4A4A4A",
        yellow: {
          DEFAULT: "#F5C518",
          soft: "#FDE585",
        },
        blue: {
          DEFAULT: "#3BA7E8",
          soft: "#C7E7F8",
        },
        pink: "#FF8FA3",
        mint: "#B8E6C1",
        dark: "#0F172A",
      },
      borderRadius: {
        chunk: "22px",
        chunkSm: "14px",
      },
      boxShadow: {
        play: "6px 6px 0 #1A1A1A",
        playSm: "4px 4px 0 #1A1A1A",
        playPressed: "2px 2px 0 #1A1A1A",
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
      maxWidth: {
        page: "1160px",
      },
      animation: {
        wiggle: "wiggle 1.6s ease-in-out infinite",
        pop: "pop 220ms ease-out",
        breathe: "breathe 2.4s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.6)" },
          "60%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
