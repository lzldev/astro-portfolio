import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  // redirects: {
  //   "/": "/pt-br/",
  // },
  i18n: {
    defaultLocale: "pt-br",
    locales: ["en", "pt-br"],
    routing: {
      prefixDefaultLocale: true,
      strategy: "pathname",
    },
  },
  vite: {
    build: {
      minify: "terser",
    },
  },
});
