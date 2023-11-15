const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: colors.stone["300"],
        accent: colors.stone["500"],
        highlight: colors.pink["600"],
        "highlight-off": colors.pink["500"],
      },
    },
  },
  plugins: [],
};
