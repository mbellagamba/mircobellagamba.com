import React from "react"

export default function useDarkMode() {
  const preferDarkQuery = "(prefers-color-scheme: dark)"
  const [mode, setMode] = React.useState(() => {
    if (typeof window === "undefined") {
      return "light"
    }
    const lsVal = window.localStorage.getItem("theme")
    if (lsVal) {
      return lsVal === "dark" ? "dark" : "light"
    } else {
      return window.matchMedia(preferDarkQuery).matches ? "dark" : "light"
    }
  })
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(preferDarkQuery)
      const handleChange = () => {
        setMode(mediaQuery.matches ? "dark" : "light")
      }
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", mode)
    }
  }, [mode])
  // we're doing it this way instead of as an effect so we only
  // set the localStorage value if they explicitly change the default
  return [mode, setMode]
}
