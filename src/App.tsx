import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CodePanel from './components/CodePanel'
import SearchDialog from './components/SearchDialog'
import OverviewPage from './pages/OverviewPage'
import CustomersPage from './pages/CustomersPage'
import PaymentIntentsPage from './pages/PaymentIntentsPage'
import ChargesPage from './pages/ChargesPage'
import ProductsPage from './pages/ProductsPage'
import CheckoutSessionsPage from './pages/CheckoutSessionsPage'
import { ThemeProvider } from './lib/ThemeContext'
import { LanguageProvider } from './lib/LanguageContext'
import { UIProvider } from './lib/UIContext'
import { ScrollSpyProvider } from './lib/ScrollSpyContext'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Scroll to the anchor once it exists. On cross-page navigation the
      // destination sections mount a frame or two later, so retry briefly.
      // scroll-margin-top (in index.css) offsets for the sticky header.
      const id = hash.slice(1)
      let tries = 0
      const attempt = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView()
        } else if (tries++ < 10) {
          requestAnimationFrame(attempt)
        }
      }
      requestAnimationFrame(attempt)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])
  return null
}

function AppShell() {
  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/payment-intents" element={<PaymentIntentsPage />} />
            <Route path="/charges" element={<ChargesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/checkout-sessions" element={<CheckoutSessionsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <CodePanel />
      </div>
      <SearchDialog />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UIProvider>
          <BrowserRouter>
            <ScrollSpyProvider>
              <ScrollManager />
              <AppShell />
            </ScrollSpyProvider>
          </BrowserRouter>
        </UIProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
