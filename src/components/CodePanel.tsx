import { useScrollSpy } from '../lib/ScrollSpyContext'
import CodeSampleTabs from './CodeSampleTabs'

/**
 * Sticky right-hand column. It mirrors the endpoint section currently in view
 * (via scroll-spy), so the code sample "follows" the reader down the page.
 * Hidden on mobile, where the code renders inline inside each ContentPanel
 * section instead.
 */
export default function CodePanel() {
  const { activeId, endpoints } = useScrollSpy()

  if (endpoints.length === 0) return null

  const active =
    endpoints.find((e) => e.id === activeId) ?? endpoints[0]

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[30rem] shrink-0 overflow-hidden border-l border-slate-200 bg-slate-50/40 px-5 py-8 dark:border-slate-800 dark:bg-slate-950/30 lg:block xl:w-[34rem]">
      <div className="flex h-full flex-col">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {active.title}
        </div>
        <div className="fluxpay-scroll min-h-0 flex-1 overflow-y-auto pr-1">
          <CodeSampleTabs
            code={active.code}
            response={active.response}
            method={active.method}
            path={active.path}
          />
        </div>
      </div>
    </aside>
  )
}
