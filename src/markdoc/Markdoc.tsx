import * as React from 'react'
import { useMemo } from 'react'
import Markdoc from '@markdoc/markdoc'
import { markdocConfig } from './config'
import Callout from './Callout'

// Inert link — matches Stripe's inline links visually but doesn't navigate.
function MarkdocLink({ children }: { href?: string; children?: React.ReactNode }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  )
}

// Components that custom tags/nodes render into.
const components = { Callout, MarkdocLink }

/**
 * Parses and renders a Markdoc source string into branded React elements.
 * Memoized per source so re-renders are cheap. Output is wrapped in a `.markdoc`
 * scope that supplies the prose styling (see index.css).
 *
 * `inline` trims the outer paragraph margins for single-line fields such as an
 * endpoint description.
 */
export default function MarkdocContent({
  source,
  inline = false,
  className = '',
}: {
  source: string
  inline?: boolean
  className?: string
}) {
  const node = useMemo(() => {
    const ast = Markdoc.parse(source)
    const content = Markdoc.transform(ast, markdocConfig)
    return Markdoc.renderers.react(content, React, { components })
  }, [source])

  return (
    <div className={`markdoc ${inline ? 'markdoc-inline' : ''} ${className}`}>
      {node}
    </div>
  )
}
