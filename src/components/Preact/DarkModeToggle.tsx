import { useEffect, useState } from "preact/hooks";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className="absolute left-4 top-4 z-50 flex h-24 w-24 items-center justify-center"
      onClick={handleClick}
    >
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </div>
  );
}

function DarkModeIcon() {
  return (
    <svg
      className={"m-auto fill-regularText"}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 -960 960 960"
      width="48"
    >
      <path d="M240-410q51 0 93.5 27.5T396-307l7 17h19q45 0 76.5 32t31.5 78q0 46-32.5 78T420-70H240q-70 0-120-50T70-240q0-71 50-120.5T240-410Zm321-72q66 66 145.5 93.5T877-367q8-1 14 2.5t11 8.5q5 5 6.5 12t-.5 15q-38 130-142.5 209.5T524-40h-8q35-24 54.5-61t19.5-79q0-66-42-113t-105-55q-30-56-84-89t-119-33q-32 0-62.5 8.5T120-436v-8q0-142 79-240.5T408-826q8-2 15.5-1t12.5 6q5 5 9 11t3 14q-5 91 21 169.5T561-482Z" />
    </svg>
  );
}

function LightModeIcon() {
  return (
    <svg
      className={"m-auto fill-regularText"}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 -960 960 960"
      width="48"
    >
      <path d="m749-169-63-63q-9-9.067-9-21.533Q677-266 686-275q9-9 21.467-9 12.466 0 21.533 9l63 63q9 9.067 9 21.533Q801-178 791.947-169q-9.052 9-21.5 9Q758-160 749-169Zm-509-11q-57.75 0-98.875-41.177t-41.125-99Q100-378 141.125-419 182.25-460 240-460q38.857 0 71.643 20.907T359-382l18.235 41H421q33 0 56 24t23 57q0 33-23.5 56.5T420-180H240Zm318-73q0-61-41-104.5T416-401q-20-56-68-89t-108-30q14-88 82.5-144T480-720q100 0 170 70t70 170q0 78-44.5 140T558-253Zm242-197q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T800-510h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450h-90ZM233-685l-64-64q-9-9-9-21t9-21q8.8-9 20.9-9 12.1 0 21.1 9l64 64q9 8.8 9 20.9 0 12.1-9 21.1-9 9-21 9t-21-9Zm452 0q-9-9-9-21.467 0-12.466 9-21.533l63-63q9.067-9 21.533-9Q782-800 791-791q9 9 9 21t-9 21l-64 64q-9 9-21 9t-21-9Zm-205.175-85Q467-770 458.5-778.625T450-800v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Z" />
    </svg>
  );
}
