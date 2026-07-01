import type { Param } from '../data/apiData'

export default function ParamsTable({ params }: { params: Param[] }) {
  if (params.length === 0) return null

  return (
    <div className="mt-6">
      <div className="mb-1 text-[13px] font-semibold text-stripe-head dark:text-slate-200">
        Parameters
      </div>
      <div className="divide-y divide-stripe-border border-t border-stripe-border dark:divide-slate-800 dark:border-slate-800">
        {params.map((param) => (
          <div key={param.name} className="py-3">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <code className="font-mono text-[13px] font-semibold text-stripe-head dark:text-slate-100">
                {param.name}
              </code>
              <span className="text-[12px] text-stripe-muted dark:text-slate-500">
                {param.type}
              </span>
              {param.required ? (
                <span className="text-[12px] font-medium text-[#b3093c] dark:text-red-300">
                  Required
                </span>
              ) : (
                <span className="text-[12px] text-stripe-faint dark:text-slate-500">
                  Optional
                </span>
              )}
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-stripe-text dark:text-slate-300">
              {param.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
