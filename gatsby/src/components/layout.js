import React from "react"

import Header from "./header"
import Footer from "./footer"
import CookieConsent from "./cookie-consent"

const Layout = ({ location, title, children }) => {
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "60rem" }}>
      <header>
        <Header location={location} title={title} />
      </header>
      <main style={{ margin: "var(--space-m)" }}>{children}</main>
      <footer>
        <Footer />
      </footer>
      <CookieConsent />
    </div>
  )
}

export default Layout
