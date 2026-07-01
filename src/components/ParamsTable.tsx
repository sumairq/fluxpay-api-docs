import type { Param } from '../data/apiData'

export default function ParamsTable({ params }: { params: Param[] }) {
  if (params.length === 0) return null

  return (
    <div className="mt-6">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Parameters
      </div>
      <div className="divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {params.map((param) => (
          <div key={param.name} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <code className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
                {param.name}
              </code>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                {param.type}
              </span>
              <span
                className={
                  param.required
                    ? 'text-[11px] font-medium uppercase tracking-wide text-accent-600 dark:text-accent-400'
                    : 'text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500'
                }
              >
                {param.required ? 'Required' : 'Optional'}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {param.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
