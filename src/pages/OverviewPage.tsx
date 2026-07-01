import { overview } from '../data/apiData'
import CodeSampleTabs from '../components/CodeSampleTabs'
import MarkdocContent from '../markdoc/Markdoc'
import SectionActions from '../components/SectionActions'
import OverviewIntroAside from '../components/OverviewIntroAside'

const sectionGrid =
  'grid grid-cols-1 gap-x-16 gap-y-6 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'

export default function OverviewPage() {
  const bareUrl = overview.baseUrl.replace(/^https?:\/\//, '')

  return (
    <div className="mx-auto max-w-[1540px] px-6 pt-12 sm:px-10 lg:px-14">
      <div className="divide-y divide-stripe-border dark:divide-slate-800">
        {/* Introduction */}
        <section id="introduction" data-endpoint-section className={sectionGrid}>
          <div>
            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-stripe-head dark:text-white">
              {overview.title}
            </h1>
            <MarkdocContent
              source={overview.intro}
              className="mt-4 text-[14px] leading-relaxed text-stripe-text dark:text-slate-300"
            />
            <div className="mt-8 flex items-center gap-2 text-[13px] text-stripe-muted dark:text-slate-400">
              Was this section helpful?
              <button type="button" onClick={(e) => e.preventDefault()} className="font-medium text-accent-500 hover:text-accent-600">
                Yes
              </button>
              <button type="button" onClick={(e) => e.preventDefault()} className="font-medium text-accent-500 hover:text-accent-600">
                No
              </button>
            </div>
          </div>
          <div>
            <SectionActions />
            <OverviewIntroAside baseUrl={bareUrl} />
          </div>
        </section>

        {/* All remaining getting-started sections */}
        {overview.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            data-endpoint-section
            className={sectionGrid}
          >
            <div>
              <h2 className="text-[22px] font-semibold text-stripe-head dark:text-white">
                {section.heading}
              </h2>
              <MarkdocContent
                source={section.body}
                className="mt-3 text-[14px] leading-relaxed text-stripe-text dark:text-slate-300"
              />
            </div>
            <div>
              <SectionActions />
              {section.code && (
                <div className="lg:sticky lg:top-6">
                  <CodeSampleTabs
                    code={section.code}
                    response={section.response ?? ''}
                    method={section.method ?? 'GET'}
                    path={section.path ?? '/v1'}
                    label={section.heading}
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-4 flex items-center justify-end gap-1.5 border-t border-stripe-border py-6 text-[12px] text-stripe-faint dark:border-slate-800 dark:text-slate-500">
        Powered by
        <a
          href="https://markdoc.dev"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-stripe-muted hover:text-stripe-head dark:text-slate-400"
        >
          Markdoc
        </a>
      </footer>
    </div>
  )
}
