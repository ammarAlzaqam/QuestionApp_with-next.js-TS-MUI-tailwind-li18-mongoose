const rtl = require("tailwindcss-rtl");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [rtl()],
};
