import colors from "tailwindcss/colors"
import type { Config } from "tailwindcss"

const customColors = {
  sandstone: {
    50: "hsl(30, 8%, 95%)",
    100: "hsl(24, 8%, 88%)",
    200: "hsl(30, 7%, 77%)",
    300: "hsl(28, 8%, 64%)",
    400: "hsl(28, 7%, 53%)",
    500: "hsl(22, 7%, 45%)",
    600: "hsl(21, 7%, 40%)",
    700: "hsl(10, 7%, 33%)",
    800: "hsl(7, 5%, 29%)",
    900: "hsl(0, 5%, 26%)",
    950: "hsl(0, 6%, 14%)",
  },
  zorba: {
    "50": "hsl(30, 14%, 97%)",
    "100": "hsl(30, 7%, 94%)",
    "200": "hsl(30, 7%, 89%)",
    "300": "hsl(34, 8%, 82%)",
    "400": "hsl(27, 7%, 71%)",
    "500": "hsl(30, 7%, 61%)",
    "600": "hsl(30, 6%, 51%)",
    "700": "hsl(32, 6%, 42%)",
    "800": "hsl(30, 6%, 35%)",
    "900": "hsl(30, 5%, 31%)",
    "950": "hsl(36, 6%, 15%)",
  },
  woodsmoke: {
    "50": "hsl(240, 7%, 97%)",
    "100": "hsl(270, 12%, 94%)",
    "200": "hsl(266, 10%, 86%)",
    "300": "hsl(268, 11%, 74%)",
    "400": "hsl(265, 11%, 60%)",
    "500": "hsl(266, 10%, 48%)",
    "600": "hsl(266, 11%, 39%)",
    "700": "hsl(267, 11%, 32%)",
    "800": "hsl(266, 10%, 27%)",
    "900": "hsl(265, 10%, 24%)",
    "950": "hsl(270, 10%, 8%)",
  },
  coolPink: {
    DEFAULT: "#fcb5c6",
    dark: "#f14274",
  },
} as const

const config = {
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...customColors,
        // Text ---
        light: {
          DEFAULT: customColors.sandstone["800"],
          highlight: customColors.sandstone["900"],
          muted: colors.neutral["500"],
          selection: customColors.coolPink.dark,
        },
        dark: {
          DEFAULT: customColors.woodsmoke["200"],
          highlight: customColors.woodsmoke["100"],
          muted: customColors.woodsmoke["500"],
          selection: customColors.coolPink.dark,
        },
        // ---
        background: {
          DEFAULT: customColors.zorba["400"],
          dark: {
            DEFAULT: customColors.woodsmoke["950"],
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        blobby_noise: "url('/blobby_noise.svg')",
        dark_noise: "url('/dark_noise.svg')",
        noise: "url('/noise.svg')",
        "noise-new": "url('/noise-new.svg')",
        "noise-new-dark": "url('/noise-new-dark.svg')",
      },
    },
  },
} satisfies Config

export default config
