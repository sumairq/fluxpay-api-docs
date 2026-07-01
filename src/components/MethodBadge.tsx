import type { HttpMethod } from '../data/apiData'

const STYLES: Record<HttpMethod, string> = {
  GET: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  POST: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
}

export default function MethodBadge({
  method,
  className = '',
}: {
  method: HttpMethod
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide ${STYLES[method]} ${className}`}
    >
      {method}
    </span>
  )
}
