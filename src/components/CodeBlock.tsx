import { useState } from 'react'
import { Highlight, type PrismTheme } from 'prism-react-renderer'

// A custom near-black theme so code blocks stay dark regardless of site theme,
// with teal-leaning accents to match the Fluxpay brand.
const fluxpayTheme: PrismTheme = {
  plain: {
    color: '#e2e8f0',
    backgroundColor: 'transparent',
  },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#64748b', fontStyle: 'italic' } },
    { types: ['punctuation'], style: { color: '#94a3b8' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'], style: { color: '#f0abfc' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: '#5eead4' } },
    { types: ['operator', 'entity', 'url', 'variable'], style: { color: '#e2e8f0' } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#7dd3fc' } },
    { types: ['function', 'class-name'], style: { color: '#fdba74' } },
    { types: ['regex', 'important'], style: { color: '#fca5a5' } },
  ],
}

export default function CodeBlock({
  code,
  language,
}: {
  code: string
  language: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 z-10 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-300 opacity-0 transition hover:bg-white/10 group-hover:opacity-100"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <Highlight theme={fluxpayTheme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`fluxpay-scroll overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed ${className}`}
            style={{ ...style, backgroundColor: 'transparent' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
