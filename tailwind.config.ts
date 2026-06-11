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
        background: {
          primary: "#342E37",   // Твой основной фон
          secondary: "#3E3842", // Карточки / Сайдбар активный
        },
        border: {
          tertiary: "#4A4450",  // Бордеры
        },
        accent: "#9FD356",      // Фирменный салатовый FinOs
        text: {
          primary: "#F5F5F5",   // Основной текст
          secondary: "#9E99A3", // Вторичный текст
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;