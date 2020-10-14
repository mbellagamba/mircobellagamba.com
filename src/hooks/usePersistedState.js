import React from "react"

function usePersistedState(initialState, key) {
  const json =
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null
  const [state, setState] = React.useState(
    json ? JSON.parse(json) : initialState
  )
  React.useEffect(() => {
    function handleStorageEvent(ev) {
      if (ev.key !== key) {
        const newState = ev.newValue ? JSON.parse(ev.newValue) : initialState
        if (state !== newState) {
          setState(newState)
        }
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageEvent)
      window.localStorage.setItem(key, JSON.stringify(state))
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageEvent)
      }
    }
  }, [initialState, key, state])
  return [state, setState]
}

export default usePersistedState
