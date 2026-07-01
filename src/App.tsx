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

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Let in-page anchor jumps behave normally; only reset on page change.
    if (!hash) window.scrollTo({ top: 0 })
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
              <ScrollToTop />
              <AppShell />
            </ScrollSpyProvider>
          </BrowserRouter>
        </UIProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
