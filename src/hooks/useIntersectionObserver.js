import * as React from "react"

function useIntersectionObserver(
  elementRef,
  { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false }
) {
  const [entry, setEntry] = React.useState()
  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]) => {
    setEntry(entry)
  }

  React.useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)
    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, frozen])

  return entry
}

export default useIntersectionObserver