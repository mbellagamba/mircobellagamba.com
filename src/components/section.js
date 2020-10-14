import React from "react"

export default function Section({ title, className, children, style }) {
  const divClass = "card" + (className ? " " + className : "")
  return (
    <>
      <h2 className="big-section">{title}.</h2>
      <div className={divClass} style={style}>
        {children}
      </div>
    </>
  )
}
