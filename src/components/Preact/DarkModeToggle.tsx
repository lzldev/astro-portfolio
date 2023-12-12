import { useEffect, useState } from "preact/hooks"
import { Icon } from "../Preact/Icons"

export default function ThemeToggle() {
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
    <div
      className="absolute right-4 top-4 z-50 flex items-center justify-center"
      onClick={handleClick}
    >
      <Icon className={"h-6 w-6"} icon={theme === "dark" ? "dark" : "light"} />
    </div>
  )
}
