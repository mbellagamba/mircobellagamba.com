import React from "react"
import style from "./tags.module.css"

export default function Tags({ tags }) {
  if (!tags) return null
  return (
    <ul className={style.taglist}>
      {tags.split(" ").map(tag => (
        <li key={tag} className={style.tagitem}>
          <small>#{tag}</small>
        </li>
      ))}
    </ul>
  )
}
