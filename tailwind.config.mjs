const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: colors.neutral["400"],
        "background-dark": colors.neutral["900"],
        surface: colors.neutral["600"],
        "surface-dark": colors.neutral["900"],
        accent: colors.neutral["500"],
        highlight: colors.neutral["600"],
        "regular-text": colors.neutral["300"],
        "text-muted": colors.neutral["700"],
        "text-muted-dark": colors.neutral["700"],
        "highlight-off": colors.neutral["500"],
        "footer-link": colors.neutral["400"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        blobby_noise: "url('/blobby_noise.svg')",
        dark_noise: "url('/dark_noise.svg')",
        noise: "url('/noise.svg')",
      },
    },
  },
};
