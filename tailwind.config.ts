import type { Config } from "tailwindcss";
const rtl = require("tailwindcss-rtl");

const config: Config = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        "text-title": "#FFFFFF", // أبيض
        "text-sub": "#FACC15",   // ذهبي
        "text-des": "#B0B0B0",   // رمادي
      },
      backgroundColor: {
        "bg-base": "#0D0D0D",   // خلفية أساسية
        "bg-card": "#1A1A1A",   // خلفية الكروت
      },
    },
  },
  plugins: [rtl()],
};

export default config;
