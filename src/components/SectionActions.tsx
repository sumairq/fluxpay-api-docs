// The right-aligned action links Stripe shows above each section, with the
// exact Stripe icons, weight, and `|` separators. Visual-only.

const btn =
  'flex items-center gap-1.5 transition hover:text-stripe-head dark:hover:text-slate-200'

function Divider() {
  return <span aria-hidden className="mx-3 h-3.5 w-px bg-stripe-border dark:bg-slate-700" />
}

export default function SectionActions() {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-end gap-y-1 text-[12px] font-semibold text-stripe-700 dark:text-slate-400">
      <button type="button" onClick={(e) => e.preventDefault()} className={btn}>
        {/* Sparkle */}
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M11.472 2.624a.25.25 0 0 0 .152-.152l.64-1.807A.246.246 0 0 1 12.5.499c.098 0 .196.055.236.166l.64 1.807a.25.25 0 0 0 .152.152l1.807.64c.111.04.166.138.166.236a.246.246 0 0 1-.166.236l-1.807.64a.25.25 0 0 0-.152.152l-.64 1.807a.246.246 0 0 1-.236.166.246.246 0 0 1-.236-.166l-.64-1.807a.25.25 0 0 0-.152-.152l-1.807-.64A.246.246 0 0 1 9.5 3.5c0-.098.055-.196.166-.236l1.807-.64Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="m7 5.491-.56 1.58a2.25 2.25 0 0 1-1.37 1.37L3.492 9l1.58.56a2.25 2.25 0 0 1 1.37 1.37L7 12.508l.56-1.58a2.25 2.25 0 0 1 1.37-1.37L10.508 9l-1.58-.56a2.25 2.25 0 0 1-1.37-1.37L7 5.492Zm.707-2.496a.737.737 0 0 0-.707-.5.737.737 0 0 0-.707.5L5.026 6.57a.75.75 0 0 1-.456.456L.995 8.293a.737.737 0 0 0-.5.707c0 .294.167.589.5.707l3.575 1.267a.75.75 0 0 1 .456.456l1.267 3.575c.118.333.413.5.707.5a.737.737 0 0 0 .707-.5l1.267-3.575a.75.75 0 0 1 .456-.456l3.575-1.267a.737.737 0 0 0 .5-.707.737.737 0 0 0-.5-.707L9.43 7.026a.75.75 0 0 1-.456-.456L7.707 2.995Z" />
        </svg>
        Ask about this section
      </button>

      <Divider />

      <button type="button" onClick={(e) => e.preventDefault()} className={btn}>
        {/* Copy */}
        <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M4 6.375c0-.345.28-.625.625-.625h2.75a.625.625 0 1 1 0 1.25h-2.75A.625.625 0 0 1 4 6.375Zm0 2.25C4 8.28 4.28 8 4.625 8h2.75a.625.625 0 1 1 0 1.25h-2.75A.625.625 0 0 1 4 8.625Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M8.437 1.5A2 2 0 0 0 6.5 0h-1a2 2 0 0 0-1.937 1.5H3a2 2 0 0 0-2 2V10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-.563ZM4.9 3.1h2.2V2a.6.6 0 0 0-.6-.6h-1a.6.6 0 0 0-.6.6v1.1ZM8 4.5H4a.5.5 0 0 1-.5-.5V2.9H3a.6.6 0 0 0-.6.6V10a.6.6 0 0 0 .6.6h6a.6.6 0 0 0 .6-.6V3.5a.6.6 0 0 0-.6-.6h-.5V4a.5.5 0 0 1-.5.5Z" />
        </svg>
        Copy for LLM
      </button>

      <Divider />

      <button type="button" onClick={(e) => e.preventDefault()} className={btn}>
        {/* Markdown */}
        <svg className="w-4" viewBox="0 0 208 128" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M15 10a5 5 0 00-5 5v98a5 5 0 005 5h178a5 5 0 005-5V15a5 5 0 00-5-5zM0 15C0 6.716 6.716 0 15 0h178c8.284 0 15 6.716 15 15v98c0 8.284-6.716 15-15 15H15c-8.284 0-15-6.716-15-15z" />
          <path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z" />
        </svg>
        View as Markdown
      </button>
    </div>
  )
}
