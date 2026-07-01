import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navGroups, pages } from '../data/apiData'
import { useScrollSpy } from '../lib/ScrollSpyContext'
import { useUI } from '../lib/UIContext'

function SearchInput() {
  const { setSearchOpen } = useUI()
  return (
    <button
      type="button"
      onClick={() => setSearchOpen(true)}
      className="relative flex min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap rounded-lg border border-stripe-border bg-stripe-page py-1 pl-7 pr-6 text-left text-[13px] text-stripe-muted transition hover:border-accent-400 dark:border-slate-700 dark:bg-slate-800"
    >
      <svg
        className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-stripe-500"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="9" cy="9" r="6" />
        <path d="m14 14 3 3" strokeLinecap="round" />
      </svg>
      Find anything
      <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-stripe-border bg-white px-1.5 py-0.5 text-[10px] font-medium text-stripe-faint dark:border-slate-700 dark:bg-slate-900 sm:inline">
        /
      </kbd>
    </button>
  )
}

// Visual-only "Ask AI" affordance, mirroring Stripe's docs.
function AskAIButton() {
  return (
    <button
      type="button"
      onClick={(e) => e.preventDefault()}
      className="flex shrink-0 items-center gap-1 rounded-lg border border-stripe-border bg-stripe-page px-2 py-1 text-[13px] font-medium text-stripe-700 transition hover:border-accent-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
    >
      <svg className="h-4 w-4 text-stripe-700 dark:text-slate-400" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M11.472 2.624a.25.25 0 0 0 .152-.152l.64-1.807A.246.246 0 0 1 12.5.499c.098 0 .196.055.236.166l.64 1.807a.25.25 0 0 0 .152.152l1.807.64c.111.04.166.138.166.236a.246.246 0 0 1-.166.236l-1.807.64a.25.25 0 0 0-.152.152l-.64 1.807a.246.246 0 0 1-.236.166.246.246 0 0 1-.236-.166l-.64-1.807a.25.25 0 0 0-.152-.152l-1.807-.64A.246.246 0 0 1 9.5 3.5c0-.098.055-.196.166-.236l1.807-.64Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m7 5.491-.56 1.58a2.25 2.25 0 0 1-1.37 1.37L3.492 9l1.58.56a2.25 2.25 0 0 1 1.37 1.37L7 12.508l.56-1.58a2.25 2.25 0 0 1 1.37-1.37L10.508 9l-1.58-.56a2.25 2.25 0 0 1-1.37-1.37L7 5.492Zm.707-2.496a.737.737 0 0 0-.707-.5.737.737 0 0 0-.707.5L5.026 6.57a.75.75 0 0 1-.456.456L.995 8.293a.737.737 0 0 0-.5.707c0 .294.167.589.5.707l3.575 1.267a.75.75 0 0 1 .456.456l1.267 3.575c.118.333.413.5.707.5a.737.737 0 0 0 .707-.5l1.267-3.575a.75.75 0 0 1 .456-.456l3.575-1.267a.737.737 0 0 0 .5-.707.737.737 0 0 0-.5-.707L9.43 7.026a.75.75 0 0 1-.456-.456L7.707 2.995Z"
        />
      </svg>
      Ask AI
    </button>
  )
}

function GroupSection({ groupLabel, items, activeSlug }: {
  groupLabel: string
  items: typeof navGroups[number]['items']
  activeSlug: string
}) {
  const groupIsActive = items.some((i) => i.slug === activeSlug)
  const [open, setOpen] = useState(groupIsActive)
  const { activeId, endpoints } = useScrollSpy()
  const { setSidebarOpen } = useUI()

  useEffect(() => {
    if (groupIsActive) setOpen(true)
  }, [groupIsActive])

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-2 py-1 text-[14px] font-medium text-stripe-head transition hover:text-accent-600 dark:text-slate-200"
      >
        {groupLabel}
        <svg
          className={`h-3.5 w-3.5 text-stripe-faint transition-transform ${open ? 'rotate-90' : ''}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="m6 4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="mt-1">
          {items.map((item) => {
            const isActive = item.slug === activeSlug
            const to = item.built ? `/${item.slug}` : '#'
            const page = pages[item.slug]
            return (
              <li key={item.slug}>
                <Link
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between rounded-md px-2 py-[5px] text-[14px] leading-5 transition ${
                    isActive
                      ? 'bg-accent-500/10 font-medium text-accent-500 dark:bg-accent-500/10 dark:text-accent-300'
                      : 'text-[#50617a] hover:text-stripe-head dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {!item.built && (
                    <span className="rounded bg-stripe-page px-1 py-0.5 text-[9px] font-medium uppercase text-stripe-faint dark:bg-slate-800 dark:text-slate-500">
                      soon
                    </span>
                  )}
                </Link>

                {/* Endpoint sub-anchors for the active resource, scroll-spied. */}
                {isActive && page && (
                  <ul className="mb-1 mt-0.5">
                    {(endpoints.length ? endpoints : page.endpoints).map((ep) => {
                      const active = ep.id === activeId
                      return (
                        <li key={ep.id}>
                          <a
                            href={`#${ep.id}`}
                            onClick={() => setSidebarOpen(false)}
                            className={`block truncate rounded-md py-[5px] pl-4 pr-2 text-[13px] leading-5 transition ${
                              active
                                ? 'font-medium text-accent-500 dark:text-accent-300'
                                : 'text-[#697386] hover:text-stripe-head dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                          >
                            {ep.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function SidebarContent() {
  const location = useLocation()
  const activeSlug = location.pathname.replace(/^\//, '') || 'overview'

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1.5 px-4 pt-1">
        <SearchInput />
        <AskAIButton />
      </div>
      <nav className="fluxpay-scroll mt-3 flex-1 overflow-y-auto px-4 pb-10">
        <Link
          to="/"
          className={`mb-4 block rounded-md px-2 py-[5px] text-[14px] leading-5 transition ${
            location.pathname === '/'
              ? 'bg-accent-500/10 font-medium text-accent-500 dark:bg-accent-500/10 dark:text-accent-300'
              : 'text-[#50617a] hover:text-stripe-head dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Introduction
        </Link>
        {navGroups.map((group) => (
          <GroupSection
            key={group.label}
            groupLabel={group.label}
            items={group.items}
            activeSlug={activeSlug}
          />
        ))}
      </nav>
    </div>
  )
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUI()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-full w-[280px] shrink-0 overflow-hidden border-r border-stripe-border bg-white dark:border-slate-800 dark:bg-slate-950/40 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-stripe-border bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Menu</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100%-3.25rem)]">
              <SidebarContent />
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
