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
      let frames = 0
      let lastTop = -1
      // Re-pin the anchor (instantly, ignoring the global smooth-scroll) until
      // its position stabilizes, so late layout from Markdoc/Prism can't leave
      // us off — but stop as soon as it settles to avoid fighting the user.
      const settle = () => {
        const el = document.getElementById(id)
        frames++
        if (!el) {
          if (frames < 24) requestAnimationFrame(settle)
          return
        }
        el.scrollIntoView({ behavior: 'auto' })
        if (el.offsetTop !== lastTop && frames < 24) {
          lastTop = el.offsetTop
          requestAnimationFrame(settle)
        }
      }
      requestAnimationFrame(settle)
    } else {
      document.getElementById('content-scroll')?.scrollTo({ top: 0 })
    }
  }, [pathname, hash])
  return null
}

function AppShell() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-stripe-text dark:bg-slate-900 dark:text-slate-200">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main
          id="content-scroll"
          className="fluxpay-scroll min-w-0 flex-1 overflow-y-auto bg-white dark:bg-slate-900"
        >
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
