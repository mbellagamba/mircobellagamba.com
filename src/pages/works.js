import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import WorkItem from "../components/work-item"

export default function Works({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const works = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Works" />
      <Section title="Works">
        {works.map(({ node }) => (
          <WorkItem key={node.fields.slug} node={node} />
        ))}
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/works/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM YYYY")
            title
            description
            tags
            url
            icon {
              childImageSharp {
                fixed(width: 50, height: 50) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
