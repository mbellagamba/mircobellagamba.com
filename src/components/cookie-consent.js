import React from "react"
import usePersistedState from "../hooks/usePersistedState"
import styles from "./cookie-consent.module.css"

const CookieConsent = () => {
  const [consent, setConsent] = usePersistedState("", "cookie-consent")
  React.useLayoutEffect(() => {
    const allowCookies = () => setConsent(true)
    window.addEventListener("click", allowCookies)
    window.addEventListener("scroll", allowCookies)
    return () => {
      window.removeEventListener("click", allowCookies)
      window.removeEventListener("scroll", allowCookies)
    }
  }, [setConsent])
  if (consent !== "") return null
  return (
    <div className={styles.banner} onClick={ev => ev.stopPropagation()}>
      <p>
        This site and some selected partners use cookies or similar technologies
        as specified in the{" "}
        <a href="https://automattic.com/cookies/">cookie policy</a>. You can
        consent to the use of these technologies by closing this information,
        continuing to browse this page, interacting with a link or button
        outside this information or continuing to browse in any other way.
      </p>
      <button className={styles.confirm} onClick={() => setConsent(true)}>
        I agree
      </button>
      <button className={styles.close} onClick={() => setConsent(true)}>
        ×
      </button>
    </div>
  )
}

export default CookieConsent
