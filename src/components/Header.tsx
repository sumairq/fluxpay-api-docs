import { Link } from 'react-router-dom'
import { useTheme } from '../lib/ThemeContext'
import { useUI } from '../lib/UIContext'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 shadow-sm">
        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          {/* Abstract "flow" mark */}
          <path
            d="M6 15c3 0 3-6 6-6s3 6 6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="6" cy="15" r="1.8" fill="currentColor" />
          <circle cx="18" cy="9" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
        Flux<span className="text-accent-500">pay</span>
      </span>
    </Link>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {theme === 'dark' ? (
        <svg className="h-4.5 w-4.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="h-4.5 w-4.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

function HeaderSearch() {
  const { setSearchOpen } = useUI()
  return (
    <button
      type="button"
      onClick={() => setSearchOpen(true)}
      aria-label="Search"
      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-500 transition hover:border-accent-400 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:text-slate-200"
    >
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="9" r="6" />
        <path d="m14 14 3 3" strokeLinecap="round" />
      </svg>
      <span className="hidden text-sm sm:inline">Search</span>
      <kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-600 md:inline">
        ⌘K
      </kbd>
    </button>
  )
}

export default function Header() {
  const { setSidebarOpen } = useUI()

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-full items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 lg:hidden"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
          </svg>
        </button>

        <Logo />

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-accent-600 dark:text-accent-400"
          >
            API Reference
          </Link>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Guides
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <HeaderSearch />
          <select
            aria-label="API version"
            defaultValue="2026-06-30"
            className="hidden rounded-lg border border-slate-200 bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-slate-600 focus:border-accent-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:block"
          >
            <option value="2026-06-30">v2026-06-30</option>
            <option value="2025-12-15">v2025-12-15</option>
            <option value="2025-06-01">v2025-06-01</option>
          </select>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden rounded-lg bg-accent-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-600 sm:inline-block"
          >
            Dashboard
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
