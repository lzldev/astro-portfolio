import config from "../tailwind.config.mjs"
import resolveConfig from "tailwindcss/resolveConfig"

function getTailwindConfig() {
  return resolveConfig(config)
}

export { getTailwindConfig }
