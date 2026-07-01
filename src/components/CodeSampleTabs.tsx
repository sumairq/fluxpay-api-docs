import { useState } from 'react'
import {
  languageTabs,
  prismLanguage,
  type CodeSamples,
} from '../data/apiData'
import { useLanguage } from '../lib/LanguageContext'
import CodeBlock from './CodeBlock'

function ChevronUpDown() {
  return (
    <svg className="h-2.5 w-2.5 text-[#c9ced8]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m5 6.5 3-3 3 3M5 9.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      aria-label="Copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="grid h-6 w-6 place-items-center rounded text-[#c9ced8] transition hover:bg-white/10 hover:text-white"
    >
      {copied ? (
        <svg className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m5 10 3.5 3.5L15 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M4 6.375c0-.345.28-.625.625-.625h2.75a.625.625 0 1 1 0 1.25h-2.75A.625.625 0 0 1 4 6.375Zm0 2.25C4 8.28 4.28 8 4.625 8h2.75a.625.625 0 1 1 0 1.25h-2.75A.625.625 0 0 1 4 8.625Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M8.437 1.5A2 2 0 0 0 6.5 0h-1a2 2 0 0 0-1.937 1.5H3a2 2 0 0 0-2 2V10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-.563ZM4.9 3.1h2.2V2a.6.6 0 0 0-.6-.6h-1a.6.6 0 0 0-.6.6v1.1ZM8 4.5H4a.5.5 0 0 1-.5-.5V2.9H3a.6.6 0 0 0-.6.6V10a.6.6 0 0 0 .6.6h6a.6.6 0 0 0 .6-.6V3.5a.6.6 0 0 0-.6-.6h-.5V4a.5.5 0 0 1-.5.5Z" />
        </svg>
      )}
    </button>
  )
}

function LanguageDropdown() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const current = languageTabs.find((t) => t.id === language)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-1.5 rounded border border-black/20 bg-[#363c45] px-2 py-1 text-[13px] text-white shadow-sm transition hover:bg-[#31363e]"
      >
        {current?.label}
        <ChevronUpDown />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 min-w-[150px] overflow-hidden rounded-md border border-slate-500/40 bg-[#3e444f] py-1 shadow-2xl shadow-black/40">
          {languageTabs.map((t) => {
            const active = t.id === language
            return (
              <button
                key={t.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  setLanguage(t.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-4 px-3 py-1.5 text-left text-[14px] transition hover:bg-white/10 ${
                  active ? 'text-white' : 'text-slate-300'
                }`}
              >
                {t.label}
                {active && (
                  <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m5 10 3.5 3.5L15 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function CodeSampleTabs({
  code,
  response,
  label,
}: {
  code: CodeSamples
  response: string
  method: string
  path: string
  label?: string
}) {
  const { language } = useLanguage()

  return (
    <div className="overflow-hidden rounded-lg border border-code-border bg-code-bg shadow-lg shadow-slate-900/10">
      {/* Header: label + language dropdown + copy + sparkle */}
      <div className="flex items-center justify-between gap-2 bg-code-header px-4 py-2">
        <span className="truncate text-[11px] font-semibold uppercase tracking-wider text-[#c9ced8]">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <LanguageDropdown />
          <CopyButton text={code[language]} />
          <button
            type="button"
            aria-label="Ask AI"
            onClick={(e) => e.preventDefault()}
            className="grid h-6 w-6 place-items-center rounded text-[#c9ced8] transition hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M11.472 2.624a.25.25 0 0 0 .152-.152l.64-1.807A.246.246 0 0 1 12.5.499c.098 0 .196.055.236.166l.64 1.807a.25.25 0 0 0 .152.152l1.807.64c.111.04.166.138.166.236a.246.246 0 0 1-.166.236l-1.807.64a.25.25 0 0 0-.152.152l-.64 1.807a.246.246 0 0 1-.236.166.246.246 0 0 1-.236-.166l-.64-1.807a.25.25 0 0 0-.152-.152l-1.807-.64A.246.246 0 0 1 9.5 3.5c0-.098.055-.196.166-.236l1.807-.64Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="m7 5.491-.56 1.58a2.25 2.25 0 0 1-1.37 1.37L3.492 9l1.58.56a2.25 2.25 0 0 1 1.37 1.37L7 12.508l.56-1.58a2.25 2.25 0 0 1 1.37-1.37L10.508 9l-1.58-.56a2.25 2.25 0 0 1-1.37-1.37L7 5.492Zm.707-2.496a.737.737 0 0 0-.707-.5.737.737 0 0 0-.707.5L5.026 6.57a.75.75 0 0 1-.456.456L.995 8.293a.737.737 0 0 0-.5.707c0 .294.167.589.5.707l3.575 1.267a.75.75 0 0 1 .456.456l1.267 3.575c.118.333.413.5.707.5a.737.737 0 0 0 .707-.5l1.267-3.575a.75.75 0 0 1 .456-.456l3.575-1.267a.737.737 0 0 0 .5-.707.737.737 0 0 0-.5-.707L9.43 7.026a.75.75 0 0 1-.456-.456L7.707 2.995Z" />
            </svg>
          </button>
        </div>
      </div>

      <CodeBlock code={code[language]} language={prismLanguage[language]} lineNumbers />

      {/* Response block */}
      {response && (
        <>
          <div className="border-t border-code-border bg-code-header px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#c9ced8]">
            Response
          </div>
          <CodeBlock code={response} language="json" lineNumbers />
        </>
      )}
    </div>
  )
}
