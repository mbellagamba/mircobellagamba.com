import React from "react"
import { Link } from "gatsby"

export default function ArticleItem({ node }) {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <article key={node.fields.slug}>
      <header style={{ marginBottom: "var(--space-s)" }}>
        <h3 style={{ marginBottom: "var(--space-xs)" }}>
          <Link to={node.fields.slug}>{title}</Link>
        </h3>
        <small style={{ color: "var(--text-secondary)" }}>
          {node.frontmatter.date}
        </small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </section>
    </article>
  )
}
