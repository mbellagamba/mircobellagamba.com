import React from "react"
import BackendIllustration from "./illustrations/backend"
import FrontendIllustration from "./illustrations/frontend"
import MobileIllustration from "./illustrations/mobile"
import Section from "./section"
import * as styles from "./skills.module.css"

export default function Skills() {
  const [current, setCurrent] = React.useState("frontend")
  return (
    <Section
      title="Skills"
      className="two-columns-grid"
      style={{ alignItems: "center" }}
    >
      <div>
        <ul className={styles.skills}>
          {contents.map(content => (
            <li
              key={content.key}
              style={activeRowStyle(current, content.key)}
              onMouseEnter={() => setCurrent(content.key)}
              onClick={() => setCurrent(content.key)}
            >
              <div className={styles.heading}>{content.title}</div>
              <small>{content.description}</small>
            </li>
          ))}
        </ul>
      </div>
      <CurrentTech current={current} />
    </Section>
  )
}

const contents = [
  {
    key: "frontend",
    title: "Front-end developer",
    description: "JavaScript, TypeScript, React.js, Redux, Jest",
  },
  {
    key: "backend",
    title: "Back-end developer",
    description: "C#, ASP.NET Core, SQL, AWS, Node.js",
  },
  {
    key: "mobile",
    title: "Mobile developer",
    description: "React Native, iOS (Swift), Android (Java)",
  },
]

function CurrentTech({ current }) {
  switch (current) {
    case "frontend":
      return <FrontendIllustration className={styles.illustration} />
    case "backend":
      return <BackendIllustration className={styles.illustration} />
    case "mobile":
      return <MobileIllustration className={styles.illustration} />
    default:
      return null
  }
}

function activeRowStyle(current, index) {
  return {
    border: `1px solid ${
      current === index ? "var(--primary)" : "transparent "
    }`,
  }
}
