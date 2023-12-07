// .prettierrc.mjs
/** @type {import("prettier").Config} */
module.exports = {
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-astro"],
  tabWidth: 2,
  useTabs: false,
};
