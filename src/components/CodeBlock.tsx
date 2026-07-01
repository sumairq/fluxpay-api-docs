import { Highlight, type PrismTheme } from 'prism-react-renderer'

// Syntax theme matching Stripe's docs code panel (colors measured from the
// live site): white text on #3e444f, blue keywords, green strings, orange
// numbers/booleans, light-grey punctuation.
const fluxpayTheme: PrismTheme = {
  plain: {
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#8b95a5', fontStyle: 'italic' } },
    { types: ['punctuation'], style: { color: '#c9ced8' } },
    { types: ['string', 'char', 'attr-value', 'inserted'], style: { color: '#4bca2e' } },
    { types: ['number', 'boolean', 'constant', 'symbol'], style: { color: '#ff9926' } },
    { types: ['keyword', 'atrule', 'selector', 'deleted', 'important'], style: { color: '#4abcf9' } },
    { types: ['property', 'tag', 'operator', 'variable', 'function', 'class-name', 'builtin', 'attr-name', 'entity'], style: { color: '#ffffff' } },
    { types: ['url', 'regex'], style: { color: '#4bca2e' } },
  ],
}

export default function CodeBlock({
  code,
  language,
  lineNumbers = false,
}: {
  code: string
  language: string
  lineNumbers?: boolean
}) {
  return (
    <div className="group relative">
      <Highlight theme={fluxpayTheme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`fluxpay-scroll overflow-x-auto px-4 py-3 font-mono text-[14px] leading-[1.4] ${className}`}
            style={{ ...style, backgroundColor: 'transparent' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="flex">
                {lineNumbers && (
                  <span
                    aria-hidden
                    className="mr-4 inline-block w-4 shrink-0 select-none text-right text-[#7a8494]"
                  >
                    {i + 1}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
