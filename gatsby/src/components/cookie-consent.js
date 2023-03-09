import { Link } from "gatsby"
import React from "react"
import * as styles from "./cookie-consent.module.css"

const CookieConsent = () => {
  const [consent, setConsent] = React.useState(true)
  function addConsent() {
    setConsent(true)
    window.localStorage.setItem("cookie-consent", true)
  }
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setConsent(window.localStorage.getItem("cookie-consent") || false)
    }
  }, [])
  if (consent) return null
  return (
    <div className={styles.banner} onClick={ev => ev.stopPropagation()}>
      <p>
        This site and some selected partners use cookies or similar technologies
        as specified in the <Link to="/privacy">Privacy policy</Link>. You can
        consent to the use of these technologies by closing this information,
        continuing to browse this page, interacting with a link or button
        outside this information or continuing to browse in any other way.
      </p>
      <button className={styles.confirm} onClick={addConsent}>
        I agree
      </button>
      <button className={styles.close} onClick={addConsent}>
        ×
      </button>
    </div>
  )
}

export default CookieConsent
