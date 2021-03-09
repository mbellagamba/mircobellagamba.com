/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({
  description,
  lang,
  meta,
  title,
  image: metaImage,
  pathname,
}) => {
  const { site, defaultImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            siteUrl
            social {
              twitter
            }
          }
        }
        defaultImage: file(absolutePath: { regex: "/cover.png/" }) {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const image =
    metaImage && metaImage.src ? metaImage : defaultImage.childImageSharp.resize
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title ?? site.siteMetadata.title}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : undefined}
      link={canonical ? [{ rel: "canonical", href: canonical }] : []}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: site.siteMetadata.keywords.join(","),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: site.siteMetadata.siteUrl,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: "og:image",
          content: `${site.siteMetadata.siteUrl}${image.src}`,
        },
        {
          property: "og:image:width",
          content: image.width,
        },
        {
          property: "og:image:height",
          content: image.height,
        },
        {
          property: "twitter:image",
          content: `${site.siteMetadata.siteUrl}${image.src}`,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
}

export default SEO
