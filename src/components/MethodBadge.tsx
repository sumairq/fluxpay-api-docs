import type { HttpMethod } from '../data/apiData'

// Stripe renders methods as small, bold, colored uppercase text (no pill).
const COLORS: Record<HttpMethod, string> = {
  GET: 'text-[#045ad0] dark:text-blue-300',
  POST: 'text-[#217005] dark:text-green-300',
  DELETE: 'text-[#b3093c] dark:text-red-300',
  PUT: 'text-[#b25000] dark:text-amber-300',
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
      className={`font-mono text-[11px] font-semibold uppercase tracking-wide ${COLORS[method]} ${className}`}
    >
      {method}
    </span>
  )
}
