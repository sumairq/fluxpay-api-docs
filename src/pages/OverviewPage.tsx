import { overview, type Endpoint } from '../data/apiData'
import CodeSampleTabs from '../components/CodeSampleTabs'
import { useRegisterSections } from '../lib/ScrollSpyContext'

// A synthetic endpoint so the sticky right code panel shows the auth example.
const authExample: Endpoint = {
  id: 'authentication',
  title: 'Example request',
  method: 'GET',
  path: '/v1/customers',
  description: '',
  parameters: [],
  code: overview.code,
  response: overview.response,
}

export default function OverviewPage() {
  useRegisterSections([authExample])

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
        Introduction
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {overview.title}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
        {overview.intro}
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Base URL
        </div>
        <code className="mt-1 block font-mono text-sm text-accent-700 dark:text-accent-300">
          {overview.baseUrl}
        </code>
      </div>

      {/* Section: the synthetic auth example anchors here for scroll-spy. */}
      <section
        id={authExample.id}
        data-endpoint-section
        data-endpoint-id={authExample.id}
        className="mt-4"
      >
        {overview.sections.map((section) => (
          <div key={section.id} id={section.id} className="py-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {section.heading}
            </h2>
            {section.body.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {para.split(/(fpk_test_|fpk_live_|starting_after|ending_before|limit)/).map((chunk, j) =>
                  /^(fpk_test_|fpk_live_|starting_after|ending_before|limit)$/.test(chunk) ? (
                    <code
                      key={j}
                      className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[13px] text-accent-700 dark:bg-slate-800 dark:text-accent-300"
                    >
                      {chunk}
                    </code>
                  ) : (
                    <span key={j}>{chunk}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        ))}

        {/* Inline code on mobile (sticky panel handles desktop). */}
        <div className="mt-2 lg:hidden">
          <CodeSampleTabs
            code={authExample.code}
            response={authExample.response}
            method={authExample.method}
            path={authExample.path}
          />
        </div>
      </section>
    </div>
  )
}
