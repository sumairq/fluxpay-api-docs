// Content loader.
//
// Reads every Markdoc file in /content at build time (Vite glob, so the site
// stays fully static), parses the YAML frontmatter, and reconstructs the typed
// data the app renders. This replaces the hand-written data literals that used
// to live in apiData.ts — content is now authored in content/*.md.
import Markdoc from '@markdoc/markdoc'
import { load } from 'js-yaml'
import type { Overview, ResourcePage, SearchDoc } from './types'

// Eagerly import each content file as a raw string.
const files = import.meta.glob('../../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function frontmatter<T>(source: string): T {
  const ast = Markdoc.parse(source)
  return (ast.attributes.frontmatter ? load(ast.attributes.frontmatter) : {}) as T
}

const resourcePages: ResourcePage[] = []
let overviewData: Overview | undefined

for (const [path, source] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.md$/, '')
  if (name === 'overview') {
    overviewData = frontmatter<Overview>(source)
  } else {
    resourcePages.push(frontmatter<ResourcePage>(source))
  }
}

if (!overviewData) {
  throw new Error('content/overview.md is missing')
}

// Preserve the intended reading order regardless of filesystem glob order.
const PAGE_ORDER = [
  'customers',
  'payment-intents',
  'charges',
  'products',
  'checkout-sessions',
]

resourcePages.sort(
  (a, b) => PAGE_ORDER.indexOf(a.slug) - PAGE_ORDER.indexOf(b.slug),
)

export const pages: Record<string, ResourcePage> = Object.fromEntries(
  resourcePages.map((p) => [p.slug, p]),
)

export const overview: Overview = overviewData

// Flat, searchable view over all content (built from the loaded pages).
function buildSearchDocs(): SearchDoc[] {
  const docs: SearchDoc[] = []

  docs.push({
    id: 'introduction',
    title: 'Introduction',
    breadcrumb: 'Getting Started',
    description: overview.intro,
    route: '/',
  })
  for (const section of overview.sections) {
    docs.push({
      id: `introduction#${section.id}`,
      title: section.heading,
      breadcrumb: 'Getting Started › Introduction',
      description: section.body,
      route: `/#${section.id}`,
    })
  }

  for (const page of resourcePages) {
    docs.push({
      id: page.slug,
      title: page.title,
      breadcrumb: page.group,
      description: page.description,
      route: `/${page.slug}`,
    })
    for (const endpoint of page.endpoints) {
      docs.push({
        id: `${page.slug}#${endpoint.id}`,
        title: endpoint.title,
        breadcrumb: `${page.group} › ${page.title}`,
        method: endpoint.method,
        path: endpoint.path,
        description: endpoint.description,
        route: `/${page.slug}#${endpoint.id}`,
      })
    }
  }

  return docs
}

export const searchDocs: SearchDoc[] = buildSearchDocs()
