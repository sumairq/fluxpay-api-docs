import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface UIContextValue {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  codeOpen: boolean
  setCodeOpen: (open: boolean) => void
}

const UIContext = createContext<UIContextValue | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [codeOpen, setCodeOpen] = useState(false)

  return (
    <UIContext.Provider value={{ sidebarOpen, setSidebarOpen, codeOpen, setCodeOpen }}>
      {children}
    </UIContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUI(): UIContextValue {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
