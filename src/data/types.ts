// Shared content types. Kept separate from apiData.ts so the content loader can
// import them without creating an import cycle.

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

export type CodeLanguage = 'curl' | 'python' | 'node' | 'ruby' | 'php'

export interface Param {
  name: string
  type: string
  required: boolean
  description: string
}

export type CodeSamples = Record<CodeLanguage, string>

export interface Endpoint {
  id: string
  title: string
  method: HttpMethod
  path: string
  description: string
  prose?: string
  parameters: Param[]
  code: CodeSamples
  response: string
}

export interface ResourcePage {
  slug: string
  title: string
  description: string
  group: string
  endpoints: Endpoint[]
}

export interface OverviewSection {
  id: string
  heading: string
  body: string
  /** Optional code example rendered on the right of the section. */
  method?: string
  path?: string
  code?: CodeSamples
  response?: string
}

export interface Overview {
  title: string
  intro: string
  baseUrl: string
  sections: OverviewSection[]
  code?: CodeSamples
  response?: string
}

export interface NavItem {
  label: string
  slug: string
  built: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface SearchDoc {
  id: string
  title: string
  breadcrumb: string
  method?: HttpMethod
  path?: string
  description: string
  route: string
}
