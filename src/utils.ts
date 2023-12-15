import config from "../tailwind.config.ts"
import resolveConfig from "tailwindcss/resolveConfig"

function getTailwindConfig() {
  return resolveConfig(config)
}

export { getTailwindConfig }
