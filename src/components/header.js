import React from "react"
import { Link } from "gatsby"

import styles from "./header.module.css"
import ThemeToggle from "./theme-toggle"

export default function Header({ location, title }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Link to={`/`}>{title}</Link>
      </h1>
      <button
        id="toggle-menu"
        className={`text-button ${styles.toggle}`}
        aria-label="apri menu"
        aria-haspopup="true"
        aria-controls="menu"
        onClick={() => setMenuOpen(open => !open)}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="10" y1="12" x2="20" y2="12" />
          <line x1="6" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      <div
        id="menu"
        className={styles.menu}
        role="menu"
        aria-labelledby="toggle-menu"
      >
        <button
          className={`text-button ${styles.close}`}
          aria-label="chiudi menu"
          hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <MenuLink to="/about/" location={location}>
          About
        </MenuLink>
        <MenuLink to="/blog/" location={location}>
          Blog
        </MenuLink>
        <MenuLink to="/works/" location={location}>
          Works
        </MenuLink>
        <ThemeToggle />
      </div>
    </div>
  )
}

function MenuLink({ to, children, location }) {
  const pathname = location.pathname.endsWith("/")
    ? location.pathname
    : `${location.pathname}/`
  const className =
    pathname === `${__PATH_PREFIX__}${to}` ? styles.current : undefined
  return (
    <Link to={to} className={className} role="menuitem">
      {children}
    </Link>
  )
}
