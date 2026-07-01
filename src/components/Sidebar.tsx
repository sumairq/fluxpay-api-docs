import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navGroups, pages } from '../data/apiData'
import { useScrollSpy } from '../lib/ScrollSpyContext'
import { useUI } from '../lib/UIContext'
import MethodBadge from './MethodBadge'

function SearchInput() {
  const { setSearchOpen } = useUI()
  return (
    <button
      type="button"
      onClick={() => setSearchOpen(true)}
      className="relative flex w-full items-center rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-left text-sm text-slate-400 transition hover:border-accent-400 dark:border-slate-700 dark:bg-slate-900"
    >
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="9" cy="9" r="6" />
        <path d="m14 14 3 3" strokeLinecap="round" />
      </svg>
      Search
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 sm:inline">
        /
      </kbd>
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
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
      >
        {groupLabel}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-90' : ''}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="m6 4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="mb-2 mt-0.5 space-y-0.5">
          {items.map((item) => {
            const isActive = item.slug === activeSlug
            const to = item.built ? `/${item.slug}` : '#'
            const page = pages[item.slug]
            return (
              <li key={item.slug}>
                <Link
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition ${
                    isActive
                      ? 'bg-accent-50 font-medium text-accent-700 dark:bg-accent-500/10 dark:text-accent-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {!item.built && (
                    <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-medium uppercase text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                      soon
                    </span>
                  )}
                </Link>

                {/* Endpoint sub-anchors for the active resource, scroll-spied. */}
                {isActive && page && (
                  <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-slate-200 dark:border-slate-800">
                    {(endpoints.length ? endpoints : page.endpoints).map((ep) => {
                      const active = ep.id === activeId
                      return (
                        <li key={ep.id}>
                          <a
                            href={`#${ep.id}`}
                            onClick={() => setSidebarOpen(false)}
                            className={`-ml-px flex items-center gap-2 border-l-2 py-1 pl-3 pr-2 text-[13px] transition ${
                              active
                                ? 'border-accent-500 font-medium text-accent-700 dark:text-accent-300'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                          >
                            <MethodBadge method={ep.method} className="scale-90" />
                            <span className="truncate">{ep.title}</span>
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
      <div className="px-3 pt-4">
        <SearchInput />
      </div>
      <nav className="fluxpay-scroll mt-3 flex-1 overflow-y-auto px-3 pb-10">
        <Link
          to="/"
          className={`mb-2 block rounded-md px-3 py-1.5 text-sm transition ${
            location.pathname === '/'
              ? 'bg-accent-50 font-medium text-accent-700 dark:bg-accent-500/10 dark:text-accent-300'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
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
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-slate-200 bg-slate-50 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
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
