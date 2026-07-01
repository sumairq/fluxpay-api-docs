import { useState } from 'react'
import LangIcon, { clientLibraries, type LangKey } from './LangIcon'

const link = 'font-medium text-accent-500 hover:text-accent-600 dark:text-accent-400'

function GithubIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export default function OverviewIntroAside({ baseUrl }: { baseUrl: string }) {
  const [selected, setSelected] = useState<LangKey | null>(null)
  const active = clientLibraries.find((l) => l.key === selected)

  return (
    <div className="text-[14px] leading-relaxed text-stripe-text dark:text-slate-300">
      <h3 className="text-[21px] font-bold text-stripe-head dark:text-white">
        Just getting started?
      </h3>
      <p className="mt-2">
        Check out our{' '}
        <a href="#" onClick={(e) => e.preventDefault()} className={link}>
          development quickstart
        </a>{' '}
        guide.
      </p>

      <h3 className="mt-6 text-[21px] font-bold text-stripe-head dark:text-white">
        Not a developer?
      </h3>
      <p className="mt-2">
        Use Fluxpay's{' '}
        <a href="#" onClick={(e) => e.preventDefault()} className={link}>
          no-code options
        </a>{' '}
        or apps from{' '}
        <a href="#" onClick={(e) => e.preventDefault()} className={link}>
          our partners
        </a>{' '}
        to get started with Fluxpay and to do more with your Fluxpay account—no
        code required.
      </p>

      {/* Base URL */}
      <div className="mt-5 overflow-hidden rounded-lg bg-code-header">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">
            Base URL
          </span>
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="7" y="7" width="9" height="9" rx="1.5" />
              <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" />
            </svg>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2l1 2.6L13.6 6 11 7l-1 2.6L9 7 6.4 6 9 5 10 2z" />
            </svg>
          </div>
        </div>
        <code className="block bg-code-bg px-4 py-3 font-mono text-[13px] text-slate-200">
          https://{baseUrl}
        </code>
      </div>

      {/* Client libraries */}
      <div className="mt-4 overflow-hidden rounded-lg border border-stripe-border dark:border-slate-800">
        <div className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wider text-stripe-head dark:text-slate-200">
          Client libraries
        </div>
        <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-3 px-4 py-4">
          {clientLibraries.map((lib) => {
            const isActive = lib.key === selected
            return (
              <button
                key={lib.key}
                type="button"
                onClick={() => setSelected(isActive ? null : lib.key)}
                className="flex w-12 flex-col items-center gap-1"
              >
                <LangIcon name={lib.key} />
                <span
                  className={`text-[12px] ${
                    isActive
                      ? 'font-medium text-accent-500 underline underline-offset-2'
                      : 'text-stripe-text dark:text-slate-300'
                  }`}
                >
                  {lib.label}
                </span>
              </button>
            )
          })}
        </div>

        {active ? (
          <div className="flex items-center justify-between gap-2 border-t border-stripe-border bg-stripe-page px-4 py-3 dark:border-slate-800 dark:bg-slate-800/40">
            <code className="truncate font-mono text-[13px] text-stripe-head dark:text-slate-200">
              <span className="text-stripe-faint">$ </span>
              {active.install}
            </code>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`flex shrink-0 items-center gap-1 text-[12px] font-semibold ${link}`}
            >
              <GithubIcon />
              {active.repo}
            </a>
          </div>
        ) : (
          <div className="border-t border-stripe-border bg-stripe-page px-4 py-3 text-[13px] leading-relaxed text-stripe-text dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
            By default, the Fluxpay API Docs demonstrate using curl to interact with
            the API over HTTP. Select one of our official{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className={link}>
              client libraries
            </a>{' '}
            to see examples in code.
          </div>
        )}
      </div>
    </div>
  )
}
