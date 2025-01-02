import resolveConfig from "tailwindcss/resolveConfig"
import config from "../tailwind.config.ts"

function getTailwindConfig() {
  return resolveConfig(config)
}

export { getTailwindConfig }
