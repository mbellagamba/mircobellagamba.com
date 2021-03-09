import React from "react"
import * as styles from "./tags.module.css"

export default function Tags({ tags }) {
  if (!tags) return null
  return (
    <ul className={styles.taglist}>
      {tags.split(" ").map(tag => (
        <li key={tag} className={styles.tagitem}>
          <small>#{tag}</small>
        </li>
      ))}
    </ul>
  )
}
