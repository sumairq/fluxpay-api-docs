import type { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'success'

const STYLES: Record<CalloutType, { box: string; icon: string; iconPath: ReactNode }> = {
  info: {
    box: 'border-accent-300 bg-accent-50 dark:border-accent-500/30 dark:bg-accent-500/10',
    icon: 'text-accent-600 dark:text-accent-400',
    iconPath: <path d="M10 13V9m0-3h.01M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  warning: {
    box: 'border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10',
    icon: 'text-amber-600 dark:text-amber-400',
    iconPath: <path d="M10 7v4m0 3h.01M8.6 3.2 1.7 15a1.6 1.6 0 0 0 1.4 2.4h13.8A1.6 1.6 0 0 0 18.3 15L11.4 3.2a1.6 1.6 0 0 0-2.8 0Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  success: {
    box: 'border-green-300 bg-green-50 dark:border-green-500/30 dark:bg-green-500/10',
    icon: 'text-green-600 dark:text-green-400',
    iconPath: <path d="m6 10 3 3 5-6M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
}

export default function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children?: ReactNode
}) {
  const s = STYLES[type] ?? STYLES.info
  return (
    <div className={`my-4 flex gap-3 rounded-lg border px-4 py-3 ${s.box}`}>
      <svg className={`mt-0.5 h-5 w-5 shrink-0 ${s.icon}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        {s.iconPath}
      </svg>
      <div className="min-w-0 text-sm leading-relaxed text-slate-700 dark:text-slate-200 [&_p]:m-0">
        {title && <div className="mb-0.5 font-semibold text-slate-800 dark:text-slate-100">{title}</div>}
        {children}
      </div>
    </div>
  )
}
