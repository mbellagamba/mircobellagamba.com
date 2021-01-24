import React from "react"
import { Helmet } from "react-helmet"
import useDarkMode from "../hooks/useDarkMode"

export const ThemeContext = React.createContext()

export const ThemeProvider = props => {
  const [theme, setTheme] = useDarkMode()
  const toggleTheme = () => {
    setTheme(t => (t === "dark" ? "light" : "dark"))
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "switch_theme", {
        event_category: "engagement",
      })
    }
  }

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <Helmet bodyAttributes={{ class: theme }} />
      {props.children}
    </ThemeContext.Provider>
  )
}

export const wrapWithTheme = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
