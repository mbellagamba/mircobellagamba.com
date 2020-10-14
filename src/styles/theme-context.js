import React from "react"
import { Helmet } from "react-helmet"

import usePersistedState from "../hooks/usePersistedState"

export const ThemeContext = React.createContext()

export const ThemeProvider = props => {
  const [theme, setTheme] = usePersistedState("light", "theme")
  const isDark = theme === "dark"
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
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
