import type { ResourcePage } from '../data/apiData'
import { useRegisterSections } from '../lib/ScrollSpyContext'
import MarkdocContent from '../markdoc/Markdoc'
import CodeSampleTabs from './CodeSampleTabs'
import MethodBadge from './MethodBadge'
import ParamsTable from './ParamsTable'
import SectionActions from './SectionActions'

const sectionGrid =
  'grid grid-cols-1 gap-x-16 gap-y-6 py-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'

export default function ContentPanel({ data }: { data: ResourcePage }) {
  useRegisterSections(data.endpoints)

  return (
    <div className="mx-auto max-w-[1540px] px-6 pt-12 sm:px-10 lg:px-14">
      <div className="divide-y divide-stripe-border dark:divide-slate-800">
        {/* Page intro */}
        <div className="max-w-[46rem] py-9">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-stripe-head dark:text-white">
            {data.title}
          </h1>
          <MarkdocContent
            source={data.description}
            className="mt-3 text-[14px] leading-relaxed text-stripe-text dark:text-slate-300"
          />
        </div>

        {/* Each endpoint: content left, its own code box right. */}
        {data.endpoints.map((ep) => (
          <section
            key={ep.id}
            id={ep.id}
            data-endpoint-section
            data-endpoint-id={ep.id}
            className={sectionGrid}
          >
            <div>
              <h2 className="text-[22px] font-semibold text-stripe-head dark:text-white">
                {ep.title}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <MethodBadge method={ep.method} />
                <code className="font-mono text-[13px] text-stripe-text dark:text-slate-200">
                  {ep.path}
                </code>
              </div>

              <MarkdocContent
                source={ep.description}
                className="mt-3 text-[14px] leading-relaxed text-stripe-text dark:text-slate-300"
              />

              <ParamsTable params={ep.parameters} />

              {ep.prose && (
                <MarkdocContent
                  source={ep.prose}
                  className="mt-4 text-[14px] leading-relaxed text-stripe-text dark:text-slate-300"
                />
              )}
            </div>

            <div>
              <SectionActions />
              <div className="lg:sticky lg:top-6">
                <CodeSampleTabs
                  code={ep.code}
                  response={ep.response}
                  method={ep.method}
                  path={ep.path}
                  label={ep.title}
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
