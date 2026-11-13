import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF7F2", // Background utama
          base: "#FAF7F2",
          card: "#F3EDE2",    // Background kartu/card
          border: "#E5DDD0",  // Warna border halus
          dark: "#3E362E",    // Teks utama
          muted: "#7A6F64",   // Teks sekunder
          accent: {
            DEFAULT: "#C8A98E", // Warna aksen tombol/highlight
            hover: "#B9967A",
            light: "#DFCABA",
          },
          sage: {
            DEFAULT: "#8E9B8E", // Aksen pendukung
            hover: "#7D8C7D",
            light: "#B2BFB2",
            subtle: "#E4ECE4",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(62, 54, 46, 0.05)",
        card: "0 8px 30px -4px rgba(62, 54, 46, 0.08)",
        floating: "0 14px 40px -6px rgba(62, 54, 46, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

