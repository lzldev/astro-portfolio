const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: colors.stone["600"],
        accent: colors.stone["500"],
        highlight: colors.pink["600"],
        "regular-text": colors.neutral["300"],
        "highlight-off": colors.pink["500"],
        "footer-link": colors.stone["400"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        blobby_noise: "url('/blobby_noise.svg')",
        dark_noise: "url('/dark_noise.svg')",
        noise: "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};
