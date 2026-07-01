import {
  languageTabs,
  prismLanguage,
  type CodeSamples,
} from '../data/apiData'
import { useLanguage } from '../lib/LanguageContext'
import CodeBlock from './CodeBlock'

export default function CodeSampleTabs({
  code,
  response,
  method,
  path,
}: {
  code: CodeSamples
  response: string
  method: string
  path: string
}) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f19] shadow-xl shadow-black/20">
      {/* Request block */}
      <div className="flex items-center gap-2 border-b border-slate-800 px-3 pt-2">
        {languageTabs.map((tab) => {
          const active = tab.id === language
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLanguage(tab.id)}
              className={`relative -mb-px rounded-t-md px-2.5 py-1.5 text-xs font-medium transition ${
                active
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
              {active && (
                <span className="absolute inset-x-1.5 -bottom-px h-0.5 rounded-full bg-accent-400" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2 px-4 pt-3 pb-1 font-mono text-[11px] text-slate-500">
        <span className="font-semibold uppercase text-slate-400">{method}</span>
        <span className="truncate">{path}</span>
      </div>

      <CodeBlock code={code[language]} language={prismLanguage[language]} />

      {/* Response block */}
      <div className="border-t border-slate-800 px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Response
      </div>
      <CodeBlock code={response} language="json" />
    </div>
  )
}
