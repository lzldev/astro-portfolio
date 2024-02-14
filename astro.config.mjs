import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/static"
import tailwind from "@astrojs/tailwind"
import preact from "@astrojs/preact"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: vercel(),
  devToolbar: {
    enabled: false,
  },
  integrations: [
    preact({
      compat: true,
    }),
    tailwind(),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: "rose-pine-moon",
    },
  },
  redirects: {
    "/": "/pt-br/",
  },
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
})
