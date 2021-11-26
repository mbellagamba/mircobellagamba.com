import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"

export default function About({ data, location }) {
  const { title, author } = data.site.siteMetadata
  const images = data.allFile.nodes.map(n => n.childImageSharp.gatsbyImageData)
  return (
    <Layout location={location} title={title}>
      <SEO title="About" />
      <Section title="About">
        <p>{author.bio}</p>
      </Section>
      <Section title="Background" className="two-columns-grid">
        <AboutList
          title="Work experiences"
          items={workExperiences}
          images={images}
        />
        <AboutList title="Education" items={education} images={images} />
        <AboutList
          title="Certifications"
          items={certifications}
          images={images}
        />
      </Section>
    </Layout>
  )
}

const AboutList = ({ title, items, images }) => (
  <div>
    <h3 style={{ fontWeight: 600 }}>{title}.</h3>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map(item => (
        <li
          key={`${item.title}${item.period}`}
          style={{
            display: "grid",
            gridTemplateColumns: "70px auto",
            marginBottom: "var(--space-s)",
          }}
        >
          <GatsbyImage
            image={findImage(images, item.icon)}
            alt={item.subtitle}
            style={{ borderRadius: "10%" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ margin: 0 }}>
              {item.url ? (
                <a href={item.url} target="blank">
                  {item.title}&rarr;
                </a>
              ) : (
                item.title
              )}
            </h4>
            <span style={{ fontSize: "medium" }}>{item.subtitle}</span>
            <small style={{ color: "var(--text-secondary)" }}>
              {item.period}
            </small>
            {item.description && <small>{item.description}</small>}
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        author {
          bio
        }
      }
    }
    allFile(filter: { absolutePath: { regex: "/assets/about/.*.png$/" } }) {
      nodes {
        childImageSharp {
          gatsbyImageData(width: 60, height: 60, layout: FIXED)
        }
      }
    }
  }
`

const findImage = (images, imgName) =>
  images.find(img => img.images.fallback.src.endsWith(`${imgName}.png`))

const workExperiences = [
  {
    title: "Front-end engineer",
    subtitle: "Madisoft - Pollenza (MC), Italy",
    icon: "madisoft",
    period: "Jan 2020 - Present",
    description: "Front-end and mobile engineer",
  },
  {
    title: "Software engineer",
    subtitle: "Nautes - Jesi (AN), Italy",
    icon: "nautes",
    period: "Jan 2016 - Dec 2019",
    description: "Fullstack developer, mobile developer",
  },
  {
    title: "Software engineer intern",
    subtitle: "Vendini - Gualdo Tadino (PG), Italy",
    icon: "vendini",
    period: "Jul 2015 - Oct 2015",
    description: "Front-end developer, test engineer",
  },
  {
    title: "Software engineer",
    subtitle: "Crea-D - Caldarola (MC), Italy",
    icon: "crea-d",
    period: "Apr 2015 - Jun 2015",
    description: "Mobile developer",
  },
]

const education = [
  {
    title: "Computer and automation engineering, Master’s degree",
    subtitle: "Università Politecnica delle Marche",
    icon: "univpm",
    description: "110/110 cum laude",
    period: "2013-2015",
  },
  {
    title: "Computer and automation engineering, Bachelor degree",
    subtitle: "Università Politecnica delle Marche",
    icon: "univpm",
    description: "110/110 cum laude",
    period: "2010-2013",
  },
]

const certifications = [
  {
    title: "Microsoft Certified Professional – Programming C# (70-483)",
    subtitle: "Microsoft",
    icon: "microsoft",
    period: "Jan 2019",
    url: "https://www.youracclaim.com/badges/901ce614-1327-4b5e-bbd1-4781d74ae12f/public_url",
  },
  {
    title: "License to practice as Engineer",
    subtitle: "Ordine degli Ingegneri di Ancona",
    icon: "oia",
    period: "Sep 2016",
    url: "https://www.ordineingegneri.ancona.it/albo",
  },
]
