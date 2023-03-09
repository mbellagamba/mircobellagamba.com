import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import Tags from "./tags"

export default function WorkItem({ node }) {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <article style={{ display: "flex", borderRadius: "0.5rem" }}>
      {node.frontmatter.icon && (
        <GatsbyImage
          image={node.frontmatter.icon.childImageSharp.gatsbyImageData}
          style={{ borderRadius: "0.5rem", border: "1px solid #00000044" }}
          alt={`${title} logo`}
        />
      )}
      <div style={{ flex: 1, marginLeft: "var(--space-m)" }}>
        <header>
          <h3 style={{ margin: 0 }}>
            {node.frontmatter.url ? (
              <a href={node.frontmatter.url} target="__blank">
                {title} →
              </a>
            ) : (
              title
            )}
          </h3>
        </header>
        <section>
          <small>{node.frontmatter.date}</small>
          <Tags tags={node.frontmatter.tags} />
          <small
            style={{ color: "var(--text-secondary)", fontStyle: "italic" }}
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
          />
          <div dangerouslySetInnerHTML={{ __html: node.html || "" }} />
        </section>
      </div>
    </article>
  )
}
