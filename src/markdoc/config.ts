import type { Config } from '@markdoc/markdoc'

// Markdoc configuration shared by every rendered document.
// - `variables` let content reference brand constants as {% $baseUrl %} etc.
// - `tags` map custom {% callout %} syntax to a Fluxpay React component.
// Standard Markdown nodes use Markdoc defaults and are styled via the `.markdoc`
// CSS scope (see index.css), which is more robust than overriding node schemas.
export const markdocConfig: Config = {
  variables: {
    baseUrl: 'api.fluxpay.dev',
    testKey: 'fpk_test_...',
    liveKey: 'fpk_live_...',
  },
  tags: {
    callout: {
      render: 'Callout',
      attributes: {
        type: {
          type: String,
          default: 'info',
          matches: ['info', 'warning', 'success'],
        },
        title: { type: String },
      },
    },
  },
  nodes: {
    // Render links as inert anchors — they mirror Stripe's links visually but
    // don't navigate (this is a demo; no destinations).
    link: {
      render: 'MarkdocLink',
      attributes: {
        href: { type: String, default: '#' },
        title: { type: String },
      },
    },
  },
}
