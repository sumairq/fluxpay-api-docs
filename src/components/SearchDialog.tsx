import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { searchDocs, type SearchDoc } from '../data/apiData'
import { useUI } from '../lib/UIContext'
import MethodBadge from './MethodBadge'

// Highlights the first case-insensitive occurrence of the query in a string.
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-accent-200/70 px-0.5 text-inherit dark:bg-accent-500/30">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  )
}

// Default suggestions when the query is empty: the top-level pages + intro.
const defaultDocs = searchDocs.filter((d) => !d.id.includes('#'))

export default function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUI()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const fuse = useMemo(
    () =>
      new Fuse(searchDocs, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'path', weight: 0.25 },
          { name: 'breadcrumb', weight: 0.15 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 1,
      }),
    [],
  )

  const results: SearchDoc[] = useMemo(() => {
    const q = query.trim()
    if (!q) return defaultDocs
    return fuse.search(q, { limit: 12 }).map((r) => r.item)
  }, [query, fuse])

  // Global hotkeys: Cmd/Ctrl+K or "/" to open, Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)

      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setSearchOpen(true)
      } else if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSearchOpen])

  // Reset + focus when the dialog opens; lock body scroll while open.
  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      setActive(0)
      // Focus after the panel mounts.
      requestAnimationFrame(() => inputRef.current?.focus())
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [searchOpen])

  // Keep the active row within the results range and scrolled into view.
  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`,
    )
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!searchOpen) return null

  const select = (doc: SearchDoc | undefined) => {
    if (!doc) return
    setSearchOpen(false)
    navigate(doc.route)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(results[active])
    }
  }

  // Group consecutive results by breadcrumb for display while keeping a global
  // index so keyboard navigation stays linear across groups.
  let renderIndex = -1

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] sm:pt-[15vh]">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <svg
            className="h-5 w-5 shrink-0 text-slate-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 3 3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search the API reference…"
            className="w-full bg-transparent py-4 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
          />
          <kbd className="hidden shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 sm:inline">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="fluxpay-scroll max-h-[min(24rem,60vh)] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-slate-400">
              No results for <span className="font-medium text-slate-500 dark:text-slate-300">“{query}”</span>
            </div>
          ) : (
            results.map((doc, i) => {
              const showHeader = i === 0 || results[i - 1].breadcrumb !== doc.breadcrumb
              renderIndex = i
              const isActive = i === active
              return (
                <div key={doc.id}>
                  {showHeader && (
                    <div className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {doc.breadcrumb}
                    </div>
                  )}
                  <button
                    type="button"
                    data-index={renderIndex}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(doc)}
                    className={`flex w-full items-center gap-3 px-4 py-2 text-left transition ${
                      isActive
                        ? 'bg-accent-50 dark:bg-accent-500/10'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {doc.method ? (
                      <MethodBadge method={doc.method} className="shrink-0" />
                    ) : (
                      <span className="grid h-5 w-9 shrink-0 place-items-center">
                        <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M6 4h8a1 1 0 0 1 1 1v11l-5-3-5 3V5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                        <Highlight text={doc.title} query={query} />
                      </span>
                      {doc.path && (
                        <span className="block truncate font-mono text-xs text-slate-400 dark:text-slate-500">
                          <Highlight text={doc.path} query={query} />
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <kbd className="hidden shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 sm:inline">
                        ↵
                      </kbd>
                    )}
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 border-t border-slate-200 px-4 py-2.5 text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-slate-200 px-1 dark:border-slate-700">↑</kbd>
            <kbd className="rounded border border-slate-200 px-1 dark:border-slate-700">↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-slate-200 px-1 dark:border-slate-700">↵</kbd>
            to select
          </span>
          <span className="ml-auto">Fluxpay docs</span>
        </div>
      </div>
    </div>
  )
}
