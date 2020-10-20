import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleItem from "../components/article-item"
import MainIllustration from "../components/illustrations/main"
import Skills from "../components/skills"
import Section from "../components/section"
import WorkItem from "../components/work-item"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const works = data.works.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Mirco Bellagamba: frontend engineer, enthusiastic coder" />
      <div
        className="two-columns-grid"
        style={{
          fontFamily:
            "'Segoe UI', 'Helvetica Neue', 'Helvetica', Arial, sans-serif",
          fontSize: "x-large",
          marginBottom: "var(--space-xl)",
          font: "200 3rem/3.5rem var(--font-family-heading)",
        }}
      >
        <div>
          <div>Hi, I'm Mirco.</div>
          <div>
            I enjoy crafting quality software for{" "}
            <span style={{ color: "var(--primary)" }}>people</span>.
          </div>
        </div>
        <MainIllustration />
        <div></div>
      </div>

      <p
        style={{
          marginBottom: "var(--space-l)",
          fontSize: "x-large",
          lineHeight: "2rem",
        }}
      >
        {data.site.siteMetadata.author.bio}
      </p>
      <Link to="/about/">About me</Link>
      <Skills />
      <Section title="Blog">
        {posts.map(({ node }) => (
          <ArticleItem key={node.fields.slug} node={node} />
        ))}
        <Link to="/blog/">View all articles</Link>
      </Section>
      <Section title="Works">
        {works.map(({ node }) => (
          <WorkItem key={node.fields.slug} node={node} />
        ))}
        <Link to="/works/">View all works</Link>
      </Section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          bio
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      limit: 10
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    works: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/works/(nuvola|fradeani|feedbackloop)/" }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM YYYY")
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
