import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"

export default function Privacy({ data, location }) {
  const { title } = data.site.siteMetadata
  return (
    <Layout location={location} title={title}>
      <SEO title="privacy" />
      <Section title="Privacy policy">
        <h2>Informativa per il trattamento dei dati personali</h2>
        <p>
          La presente informativa è resa ai sensi dell’art. 13 del D.Lgs. 30
          giugno 2003 n.196 - Codice in materia di protezione dei dati
          personali.
        </p>
        <h3>1. Finalità del trattamento</h3>
        <p>
          I Suoi dati personali sono raccolti e trattati dal Titolare per le
          seguenti finalità: a) Per fini statistici questo sito utilizza Google
          Analytics. Google Analytics è un servizio di analisi web fornito da
          Google, Inc. (“Google”) che utilizza dei “cookie” mediante i quali
          raccoglie Dati Personali dell’Utente che vengono trasmessi a, e
          depositati presso i server di Google negli Stati Uniti. Google
          utilizza queste informazioni allo scopo di tracciare e esaminare il
          vostro utilizzo del sito web, compilare report sulle attività del sito
          web per gli operatori del sito web e fornire altri servizi relativi
          alle attività del sito web e all’utilizzo di Internet. Google non
          associa l’indirizzo IP dell’utente a nessun altro dato posseduto da
          Google. L’eventuale rifiuto di utilizzare i cookie, selezionando
          l’impostazione appropriata sul vostro browser, può impedire di
          utilizzare tutte le funzionalità di questo sito web.
        </p>
        <h3> 2. Modalità del trattamento</h3>
        <p>
          Il trattamento dei dati verrà effettuato sia con l’ausilio di
          strumentazioni informatiche che su supporto cartaceo e, comunque,
          mediante strumenti idonei a garantirne la sicurezza e la riservatezza
          attraverso l’adozione delle misure di sicurezza prescritte dal Codice
          della Privacy.
        </p>
        <h3>3. Titolare e responsabile del trattamento</h3>
        <p>
          Il Titolare del trattamento dei Suoi dati personali è: Mirco
          Bellagamba. Il testo completo dell'art. 7 del D.Lgs. 196/2003 relativo
          ai diritti dell'interessato è disponibile sul sito del Garante{" "}
          <a rel="nofollow" href="www.garanteprivacy.it">
            www.garanteprivacy.it
          </a>
          .
        </p>
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
  }
`
