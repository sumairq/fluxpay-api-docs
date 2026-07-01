import { Link } from 'react-router-dom'
import { useTheme } from '../lib/ThemeContext'
import { useUI } from '../lib/UIContext'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1.5">
      <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-accent-400 to-accent-600">
        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M6 15c3 0 3-6 6-6s3 6 6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="6" cy="15" r="1.9" fill="currentColor" />
          <circle cx="18" cy="9" r="1.9" fill="currentColor" />
        </svg>
      </span>
      <span className="text-[17px] font-bold tracking-tight text-stripe-head dark:text-white">
        Fluxpay
      </span>
      <span className="text-[17px] font-normal text-accent-500">API</span>
    </Link>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative inline-flex h-[18px] w-[30px] shrink-0 items-center"
    >
      {/* Rail — thinner than the knob so the knob overhangs it. */}
      <span className="h-3 w-full rounded-full border border-stripe-border bg-stripe-page transition-colors dark:border-slate-600 dark:bg-slate-700" />
      {/* Knob — taller than the rail. */}
      <span
        className={`absolute left-0 top-1/2 grid h-[18px] w-[18px] -translate-y-1/2 place-items-center rounded-full bg-white shadow ring-1 ring-black/5 transition-transform duration-200 ${
          dark ? 'translate-x-[12px]' : 'translate-x-0'
        }`}
      >
        {dark ? (
          <svg className="h-3 w-3 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="h-3 w-3 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </button>
  )
}

const navLink =
  'text-[14px] font-semibold text-accent-500 transition hover:text-accent-600 dark:text-accent-400'

export default function Header() {
  const { setSidebarOpen } = useUI()

  return (
    <header className="relative z-30 h-14 shrink-0 bg-white dark:bg-slate-900">
      <div className="flex h-full items-center">
        {/* Left segment aligned to the sidebar column; holds the logo + toggle.
            No bottom border on desktop so the sidebar flows seamlessly. */}
        <div className="flex h-full items-center gap-2 border-b border-stripe-border px-4 dark:border-slate-800 lg:w-[280px] lg:justify-between lg:border-b-0 lg:border-r lg:border-stripe-border dark:lg:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="grid h-8 w-8 place-items-center rounded-md text-stripe-muted hover:bg-stripe-hover dark:text-slate-300 lg:hidden"
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
              </svg>
            </button>
            <Logo />
          </div>
          <ThemeToggle />
        </div>

        {/* Right portion carries the header's bottom border (content area only). */}
        <div className="flex h-full flex-1 items-center border-b border-stripe-border dark:border-slate-800">
        <div className="ml-auto flex items-center gap-3 px-4 sm:gap-4 sm:pl-5 sm:pr-14">
          {/* Version selector — borderless dropdown, dark text. */}
          <div className="relative hidden items-center sm:flex">
            <select
              aria-label="API version"
              defaultValue="2026-06-30"
              className="cursor-pointer appearance-none bg-transparent pr-4 text-[14px] font-normal text-stripe-head focus:outline-none dark:text-slate-200"
            >
              <option value="2026-06-30">2026-06-30.acacia</option>
              <option value="2025-12-15">2025-12-15.dahlia</option>
              <option value="2025-06-01">2025-06-01.basil</option>
            </select>
            <svg className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-stripe-head dark:text-slate-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <nav className="hidden items-center gap-4 md:flex">
            <button type="button" onClick={(e) => e.preventDefault()} className={`flex items-center gap-0.5 ${navLink}`}>
              API Reference
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="#" onClick={(e) => e.preventDefault()} className={navLink}>
              Docs
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className={navLink}>
              Support
            </a>
          </nav>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] font-semibold text-accent-500 transition hover:text-accent-600"
          >
            Sign in →
          </a>
        </div>
        </div>
      </div>
    </header>
  )
}
