import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Endpoint } from '../data/apiData'

interface ScrollSpyContextValue {
  /** The endpoint section currently in view (drives sidebar + code panel). */
  activeId: string | null
  setActiveId: (id: string | null) => void
  /** Endpoints for the page currently rendered, used by the right code panel. */
  endpoints: Endpoint[]
  setEndpoints: (endpoints: Endpoint[]) => void
}

const ScrollSpyContext = createContext<ScrollSpyContextValue | undefined>(undefined)

export function ScrollSpyProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])

  return (
    <ScrollSpyContext.Provider value={{ activeId, setActiveId, endpoints, setEndpoints }}>
      {children}
    </ScrollSpyContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useScrollSpy(): ScrollSpyContextValue {
  const ctx = useContext(ScrollSpyContext)
  if (!ctx) throw new Error('useScrollSpy must be used within ScrollSpyProvider')
  return ctx
}

/**
 * Registers a page's endpoints with the shared context and observes their
 * on-screen sections, marking the most prominent one active as the user scrolls.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useRegisterSections(endpoints: Endpoint[]) {
  const { setActiveId, setEndpoints } = useScrollSpy()
  const ratios = useRef<Map<string, number>>(new Map())

  const ids = endpoints.map((e) => e.id).join(',')

  useEffect(() => {
    setEndpoints(endpoints)
    if (endpoints.length === 0) {
      setActiveId(null)
      return
    }
    // Default the active section to the first endpoint on the page.
    setActiveId(endpoints[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids])

  const recompute = useCallback(() => {
    let best: string | null = null
    let bestRatio = 0
    ratios.current.forEach((ratio, id) => {
      if (ratio > bestRatio) {
        bestRatio = ratio
        best = id
      }
    })
    if (best) setActiveId(best)
  }, [setActiveId])

  useEffect(() => {
    if (endpoints.length === 0) return
    ratios.current = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-endpoint-id')
          if (!id) return
          ratios.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        recompute()
      },
      {
        // Bias the "active" band toward the upper-middle of the viewport.
        rootMargin: '-10% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.85, 1],
      },
    )

    const nodes = endpoints
      .map((e) => document.querySelector(`[data-endpoint-id="${e.id}"]`))
      .filter((n): n is Element => n !== null)
    nodes.forEach((n) => observer.observe(n))

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, recompute])
}
