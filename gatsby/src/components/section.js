import React from "react"
import useIntersectionObserver from "../hooks/useIntersectionObserver"
import * as styles from "./section.module.css"

export default function Section({ title, className, children, style }) {
  const sectionRef = React.useRef(null)
  const entry = useIntersectionObserver(sectionRef, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting
  return (
    <section
      ref={sectionRef}
      className={classNames(styles.section, isVisible && styles.isVisible)}
    >
      <h2 className="big-section">{title}.</h2>
      <div className={classNames("card", className)} style={style}>
        {children}
      </div>
    </section>
  )
}

function classNames(...names) {
  return names.filter(Boolean).join(" ")
}
