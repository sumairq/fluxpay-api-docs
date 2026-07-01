import type { ResourcePage } from '../data/apiData'
import { useRegisterSections } from '../lib/ScrollSpyContext'
import CodeSampleTabs from './CodeSampleTabs'
import MethodBadge from './MethodBadge'
import ParamsTable from './ParamsTable'

export default function ContentPanel({ data }: { data: ResourcePage }) {
  useRegisterSections(data.endpoints)

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
        {data.group}
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {data.title}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
        {data.description}
      </p>

      <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
        {data.endpoints.map((ep) => (
          <section
            key={ep.id}
            id={ep.id}
            data-endpoint-section
            data-endpoint-id={ep.id}
            className="py-10"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {ep.title}
              </h2>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/40">
              <MethodBadge method={ep.method} />
              <code className="font-mono text-[13px] text-slate-700 dark:text-slate-200">
                {ep.path}
              </code>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              {ep.description}
            </p>

            <ParamsTable params={ep.parameters} />

            {ep.prose && (
              <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {ep.prose}
              </p>
            )}

            {/* On mobile the code sample lives inline beneath each endpoint. */}
            <div className="mt-6 lg:hidden">
              <CodeSampleTabs
                code={ep.code}
                response={ep.response}
                method={ep.method}
                path={ep.path}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
