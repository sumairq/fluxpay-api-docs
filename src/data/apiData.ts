// Barrel module for content + config.
//
// Content (pages, overview, searchDocs) now lives in content/*.md and is loaded
// by ./content. This file keeps the navigation config and the code-language
// tables, and re-exports the shared types so existing imports of
// '../data/apiData' keep working unchanged.

export type {
  HttpMethod,
  CodeLanguage,
  Param,
  CodeSamples,
  Endpoint,
  ResourcePage,
  OverviewSection,
  Overview,
  NavItem,
  NavGroup,
  SearchDoc,
} from './types'

import type { CodeLanguage, NavGroup } from './types'

export { pages, overview, searchDocs } from './content'

// -----------------------------------------------------------------------------
// Sidebar navigation (app structure — not document content).
// -----------------------------------------------------------------------------

export const navGroups: NavGroup[] = [
  {
    label: 'Core Resources',
    items: [
      { label: 'Customers', slug: 'customers', built: true },
      { label: 'PaymentIntents', slug: 'payment-intents', built: true },
      { label: 'Charges', slug: 'charges', built: true },
      { label: 'Refunds', slug: 'refunds', built: false },
      { label: 'Balance', slug: 'balance', built: false },
    ],
  },
  {
    label: 'Payment Methods',
    items: [
      { label: 'PaymentMethods', slug: 'payment-methods', built: false },
      { label: 'Cards', slug: 'cards', built: false },
      { label: 'Bank Accounts', slug: 'bank-accounts', built: false },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'Products', slug: 'products', built: true },
      { label: 'Prices', slug: 'prices', built: false },
      { label: 'Coupons', slug: 'coupons', built: false },
    ],
  },
  {
    label: 'Checkout',
    items: [
      { label: 'Checkout Sessions', slug: 'checkout-sessions', built: true },
      { label: 'Payment Links', slug: 'payment-links', built: false },
    ],
  },
  {
    label: 'Billing',
    items: [
      { label: 'Subscriptions', slug: 'subscriptions', built: false },
      { label: 'Invoices', slug: 'invoices', built: false },
      { label: 'Plans', slug: 'plans', built: false },
    ],
  },
  {
    label: 'Connect',
    items: [
      { label: 'Accounts', slug: 'accounts', built: false },
      { label: 'Transfers', slug: 'transfers', built: false },
      { label: 'Payouts', slug: 'payouts', built: false },
    ],
  },
]

/** Ordered language tabs shown by the code panel. */
export const languageTabs: { id: CodeLanguage; label: string }[] = [
  { id: 'curl', label: 'cURL' },
  { id: 'python', label: 'Python' },
  { id: 'node', label: 'Node.js' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'php', label: 'PHP' },
]

/** Maps a code language to a Prism language grammar. */
export const prismLanguage: Record<CodeLanguage, string> = {
  curl: 'bash',
  python: 'python',
  node: 'javascript',
  ruby: 'ruby',
  php: 'php',
}
