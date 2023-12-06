const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: colors.neutral["900"],
        darkBackground: colors.neutral["900"],
        accent: colors.neutral["500"],
        highlight: colors.neutral["600"],
        regularText: colors.neutral["300"],
        highlightOff: colors.neutral["500"],
        footerLink: colors.neutral["400"],
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
