import type { ComponentProps, FunctionComponent } from "preact"

import { useEffect, useState } from "preact/hooks"

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
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
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
