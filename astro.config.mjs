import { loadEnv } from "vite"
import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel"
import tailwind from "@astrojs/tailwind"
import preact from "@astrojs/preact"

import mdx from "@astrojs/mdx"

const { KV_REST_API_URL, KV_REST_API_TOKEN } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
)

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: vercel({}),
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
      strategy: "pathname",
    },
  },
  vite: {
    build: {
      minify: "terser",
    },
  },
  experimental: {
    session: {
      driver: "upstash",
      options: {
        url: KV_REST_API_URL,
        token: KV_REST_API_TOKEN,
      },
      cookie: {
        name: "lzldev-portfolio",
        sameSite: "lax",
      },
    },
  },
})
