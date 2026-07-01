import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { CodeLanguage } from '../data/apiData'

interface LanguageContextValue {
  language: CodeLanguage
  setLanguage: (lang: CodeLanguage) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'fluxpay-language'

function readInitialLanguage(): CodeLanguage {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as CodeLanguage | null
    if (stored) return stored
  } catch {
    /* ignore */
  }
  return 'curl'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<CodeLanguage>(readInitialLanguage)

  const setLanguage = (lang: CodeLanguage) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
