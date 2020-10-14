---
title: "React Hooks data fetching"
date: "2020-06-26"
description: "React Hooks can make data fetching easier by hiding the asynchronous state management required to handle HTTP requests."
tags: "javascript react hooks"
---

Richiedere dati ad una REST API è una attività comune alla maggior parte delle Single Page Application. A causa dell'asincrona natura delle richieste al server è sempre necessario gestire lo stato della richiesta, quindi la fase di caricamento e la successiva elaborazione della risposta o dell'eventuale errore.

## Il problema

In una applicazione [React.js](https://it.reactjs.org/) che non utilizza librerie di state management come Redux (a sua volta supportato da Redux Thunk o Redux Saga), un componente che richiede informazioni ad un server si potrebbe presentare in questo modo.

```javascript
// TopicsList.js

import React from "react"
import { topicsURL } from "./api"

function TopicsList() {
  const [topics, setTopics] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    setLoading(true)
    fetch(topicsURL)
      .then(data => setTopics(data))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }, [])

  if (error) {
    return <div>An error has occurred: {error.message}</div>
  }
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <ul>
      {topics.map(topic => (
        <li key={topic.id}>
          <a href={topic.url}>{topic.title}</a>;
        </li>
      ))}
    </ul>
  )
}
```

In questo caso, praticamente tutta la logica di `TopicsList` consiste nella gestione della richiesta al server, nascondendo quindi il vero scopo del componente che è quello di mostrare una lista di topic. Inoltre, la stessa logica utilizzata in questo caso sarà condivisa con le altre pagine dell'applicazione, come ad esempio la pagina che mostrerà il dettaglio del topic. Infine, un altro aspetto che potrebbe essere fonte di errori è la gestione dello stato della richiesta, per il quale si utilizzano tre variabili diverse (`topics`, `loading`, `error`). In caso di future modifiche è necessario assicurarsi di gestire correttamente i valori delle tre variabili in un dato momento: non è desiderabile che più di una delle 3 proprietà sia valorizzata con un valore diverso da quello iniziale. Ad esempio, che cosa dovrebbe mostrare il componente nel caso in cui sia `error`, sia `topics` fossero valorizzate?

## La soluzione

Gli [Hooks](https://it.reactjs.org/blog/2019/02/06/react-v16.8.0.html), introdotti in React.js 16.8, rappresentano un comodo strumento per condividere logica tra componenti funzionali, come ad esempio la richiesta ad una API. Dalle problematiche descritte in precedenza è possibile dedurre le specifiche desiderate per l'Hook che vogliamo creare.

1. Consente di condividere la logica per la gestione di una richiesta al server
2. Nasconde la logica di gestione lasciando emergere lo scopo di presentazione del componente
3. Gestisce lo stato della richiesta in modo atomico
4. Bonus: incrementa la testabilità dei componenti

Il seguente blocco di codice mostra una possibile implementazione.

```javascript
// api.js

import { useReducer, useEffect } from "react"

export function useApiGet(url) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    let subscribed = true
    if (url) {
      dispatch({ type: "loading" })
      apiGet(url)
        .then(data => {
          if (subscribed) {
            dispatch({ type: "success", data })
          }
        })
        .catch(error => {
          if (subscribed) {
            dispatch({ type: "error", error })
          }
        })
    }
    return () => {
      subscribed = false
    }
  }, [url])
  return state
}

const initialState = {
  status: "idle",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        status: "loading",
      }
    case "success":
      return {
        status: "success",
        data: action.data,
      }
    case "error":
      return {
        status: "error",
        error: action.error,
      }
    default:
      return state
  }
}

async function apiGet(url) {
  const headers = getDefaultHeaders() // Recupera i default headers della richiesta
  const response = await fetch(url, { headers })
  const data = await response.json()
  return response.ok ? data : Promise.reject(data)
}
```

L'hook `useApiGet` astrae la logica di gestione di una richiesta HTTP GET in modo che possa essere facilmente utilizzata da tutti i componenti dell'applicazione. Rispetto all'implementazione precedente evita il possibile problema di stato inconsistente poiché lo stato è gestito con un'unica variabile che quindi rende impossibile il verificarsi di situazioni con stati misti. Il controllo iniziale sulla presenza dell'URL consente di evitare chiamate inutili in eventuali stati indesiderati, ad esempio se uno dei parametri per comporre l'URL non è immediatamente disponibile ma deve essere recuperato da qualche sorgente asincrona. Inoltre, la variabile `subscribed` impedisce cambiamenti di `state` in caso di unmount del componente prima che la richiesta termini, evitando così possibili memory leak. La funzione `apiGet` è un semplice wrapper per una qualsiasi libreria per richiedere informazioni ad un server come [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) o [Axios](https://github.com/axios/axios). Nell'esempio, la funzione apiGet utilizza Fetch API e aggiunge i default headers, che potrebbero includere il token di autenticazione, se presente. Se i default headers non sono necessari è sufficiente implementare la funzione `getDefaultHeaders` in modo che ritorni un empty object.

## Utilizzare l'hook

Utilizzando `useApiGet` il componente `TopicsList` diventa:

```javascript
// TopicsList.js

import React from "react"
import { useApiGet, topicsURL } from "./api"

function TopicsList() {
  const { status, data, error } = useApiGet(topicsURL)
  return (
    <>
      {status === "error" && <div>An error has occurred: {error.message}</div>}
      {status === "loading" && <div>Loading...</div>}
      {status === "success" && (
        <ul>
          {data.map(topic => (
            <li key={topic.id}>
              <a href={topic.url}>{topic.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
```

Il codice risulta molto più leggibile perché lascia emergere in modo evidente lo scopo del componente di presentare una lista di topics, separando la logica di recupero del dato. Anche la testabilità del componente è aumentata perché non sono più presenti interazioni asincrone che sono nascoste all'interno dell'hook. Per questo, utilizzando uno spy o un mock per controllare il valore di ritorno dell'hook, è possibile verificare lo stato del componente in un preciso momento senza la necessità di introdurre l'uso delle promises in fase di test.

## Conclusioni

L'hook `useApiGet` è una comoda utilità che semplifica un task comune a tutte le moderne client web apps. Tra i maggiori benefici consente di ottenere:

- Separazione della logica di presentazione dalla logica di business
- Condivisione della logica di data fetching e di gestione dello stato della richiesta dei componenti
- Migliore leggibilità dei componenti che non gestiscono direttamente la richiesta
- Semplificazione dei test del componente tramite l'utilizzo di spy/mock
