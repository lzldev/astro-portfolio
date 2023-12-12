import type {
  Component,
  ComponentChild,
  ComponentProps,
  FunctionComponent,
  VNode,
} from "preact"
import { useEffect, useState } from "preact/hooks"

const root = document.documentElement
export function DarkModeSkeleton({
  Dark,
  Light,
  ...props
}: ComponentProps<"div"> & {
  children: any
  Dark: FunctionComponent | true
  Light: FunctionComponent | true
} & Record<any, any>) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light")

  useEffect(() => {
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div onClick={handleClick} {...props}>
      {theme === "dark" ? Dark : Light}
    </div>
  )
}
