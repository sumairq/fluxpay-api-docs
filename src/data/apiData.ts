// -----------------------------------------------------------------------------
// Fluxpay API reference — mock data
//
// This is the single source of truth for every endpoint rendered by the docs.
// Pages are produced by mapping over this data, so adding a new endpoint (or an
// entire resource) is just a matter of extending the structures below.
// Nothing here talks to a real backend — every value is hardcoded mock content.
// -----------------------------------------------------------------------------

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
  /** Stable anchor id used for deep-links and scroll-spy, e.g. "create-customer". */
  id: string
  title: string
  method: HttpMethod
  path: string
  description: string
  /** Optional extra prose explaining behavior, rendered under the params table. */
  prose?: string
  parameters: Param[]
  code: CodeSamples
  /** Pretty-printed JSON response body shown in the right panel. */
  response: string
}

export interface ResourcePage {
  slug: string
  title: string
  description: string
  /** Small uppercase label shown above the page title, e.g. "CORE RESOURCES". */
  group: string
  /** The resource object shape, shown as an intro card (optional). */
  objectAttributes?: Param[]
  endpoints: Endpoint[]
}

export interface NavItem {
  label: string
  /** Route slug; if the page isn't built yet this still renders (visual only). */
  slug: string
  /** When false the item is a visual placeholder that routes to "#". */
  built: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

// -----------------------------------------------------------------------------
// Sidebar navigation
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

// -----------------------------------------------------------------------------
// Overview / Authentication (home route)
// -----------------------------------------------------------------------------

export const overview = {
  title: 'Fluxpay API Reference',
  intro:
    'The Fluxpay API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.',
  baseUrl: 'https://api.fluxpay.dev',
  sections: [
    {
      id: 'authentication',
      heading: 'Authentication',
      body: 'The Fluxpay API uses API keys to authenticate requests. You can view and manage your API keys in the Fluxpay Dashboard. Test mode keys have the prefix fpk_test_ and live mode keys have the prefix fpk_live_.\n\nYour API keys carry many privileges, so keep them secure. Do not share your secret API keys in publicly accessible areas such as GitHub or client-side code.\n\nAuthentication is performed via HTTP Basic Auth. Provide your API key as the basic auth username value — you do not need to provide a password.',
    },
    {
      id: 'errors',
      heading: 'Errors',
      body: 'Fluxpay uses conventional HTTP response codes to indicate the success or failure of an API request. Codes in the 2xx range indicate success. Codes in the 4xx range indicate an error that failed given the information provided (a required parameter was omitted, a charge failed, etc.). Codes in the 5xx range indicate an error with Fluxpay servers.',
    },
    {
      id: 'pagination',
      heading: 'Pagination',
      body: 'All top-level API resources have support for bulk fetches via "list" API methods. These list API methods share a common structure, taking at least these three parameters: limit, starting_after, and ending_before. Fluxpay uses cursor-based pagination via the starting_after and ending_before parameters.',
    },
  ],
  code: {
    curl: `curl https://api.fluxpay.dev/v1/customers \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -G \\
  -d limit=3`,
    python: `import fluxpay
fluxpay.api_key = "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg"

customers = fluxpay.Customer.list(limit=3)`,
    node: `import Fluxpay from "fluxpay";
const fluxpay = new Fluxpay("fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg");

const customers = await fluxpay.customers.list({ limit: 3 });`,
    ruby: `require "fluxpay"
Fluxpay.api_key = "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg"

Fluxpay::Customer.list(limit: 3)`,
    php: `<?php
require 'vendor/autoload.php';
$fluxpay = new \\Fluxpay\\FluxpayClient('fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg');

$fluxpay->customers->all(['limit' => 3]);`,
  } as CodeSamples,
  response: `{
  "object": "list",
  "url": "/v1/customers",
  "has_more": false,
  "data": [
    {
      "id": "cus_Qk9aB2cDeFgHiJ",
      "object": "customer",
      "created": 1719849600,
      "email": "jenny.rosen@example.com",
      "livemode": false
    }
  ]
}`,
}

// -----------------------------------------------------------------------------
// Resource pages
// -----------------------------------------------------------------------------

const customers: ResourcePage = {
  slug: 'customers',
  title: 'Customers',
  group: 'Core Resources',
  description:
    'Customer objects allow you to perform recurring charges, track multiple charges, and store payment methods that are associated with the same customer. The API allows you to create, retrieve, update, and delete customers.',
  endpoints: [
    {
      id: 'create-customer',
      title: 'Create a customer',
      method: 'POST',
      path: '/v1/customers',
      description: 'Creates a new customer object.',
      prose:
        'Returns the customer object if the update succeeded. Raises an error if create parameters are invalid (for example, specifying an invalid email).',
      parameters: [
        { name: 'email', type: 'string', required: false, description: "The customer's email address. It's displayed alongside the customer in your dashboard and can be useful for searching and tracking." },
        { name: 'name', type: 'string', required: false, description: "The customer's full name or business name." },
        { name: 'description', type: 'string', required: false, description: 'An arbitrary string attached to the object. Often useful for displaying to users.' },
        { name: 'phone', type: 'string', required: false, description: "The customer's phone number." },
        { name: 'metadata', type: 'object', required: false, description: 'Set of key-value pairs that you can attach to the object for storing additional structured information.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/customers \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -d email="jenny.rosen@example.com" \\
  -d name="Jenny Rosen"`,
        python: `import fluxpay
fluxpay.api_key = "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg"

customer = fluxpay.Customer.create(
  email="jenny.rosen@example.com",
  name="Jenny Rosen",
)`,
        node: `const customer = await fluxpay.customers.create({
  email: "jenny.rosen@example.com",
  name: "Jenny Rosen",
});`,
        ruby: `customer = Fluxpay::Customer.create(
  email: "jenny.rosen@example.com",
  name: "Jenny Rosen",
)`,
        php: `$customer = $fluxpay->customers->create([
  'email' => 'jenny.rosen@example.com',
  'name' => 'Jenny Rosen',
]);`,
      },
      response: `{
  "id": "cus_Qk9aB2cDeFgHiJ",
  "object": "customer",
  "created": 1719849600,
  "email": "jenny.rosen@example.com",
  "name": "Jenny Rosen",
  "description": null,
  "phone": null,
  "balance": 0,
  "currency": null,
  "default_source": null,
  "metadata": {},
  "livemode": false
}`,
    },
    {
      id: 'retrieve-customer',
      title: 'Retrieve a customer',
      method: 'GET',
      path: '/v1/customers/:id',
      description: 'Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the customer to be retrieved.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/customers/cus_Qk9aB2cDeFgHiJ \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"`,
        python: `customer = fluxpay.Customer.retrieve("cus_Qk9aB2cDeFgHiJ")`,
        node: `const customer = await fluxpay.customers.retrieve(
  "cus_Qk9aB2cDeFgHiJ"
);`,
        ruby: `customer = Fluxpay::Customer.retrieve("cus_Qk9aB2cDeFgHiJ")`,
        php: `$customer = $fluxpay->customers->retrieve('cus_Qk9aB2cDeFgHiJ', []);`,
      },
      response: `{
  "id": "cus_Qk9aB2cDeFgHiJ",
  "object": "customer",
  "created": 1719849600,
  "email": "jenny.rosen@example.com",
  "name": "Jenny Rosen",
  "balance": 0,
  "currency": "usd",
  "metadata": {},
  "livemode": false
}`,
    },
    {
      id: 'update-customer',
      title: 'Update a customer',
      method: 'POST',
      path: '/v1/customers/:id',
      description:
        "Updates the specified customer by setting the values of the parameters passed. Any parameters not provided will be left unchanged.",
      prose:
        'This request accepts mostly the same arguments as the customer creation call.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the customer to be updated.' },
        { name: 'email', type: 'string', required: false, description: "The customer's email address." },
        { name: 'name', type: 'string', required: false, description: "The customer's full name or business name." },
        { name: 'metadata', type: 'object', required: false, description: 'Set of key-value pairs to attach to the object. Set a key to an empty string to remove it.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/customers/cus_Qk9aB2cDeFgHiJ \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -d "metadata[order_id]"=6735`,
        python: `customer = fluxpay.Customer.modify(
  "cus_Qk9aB2cDeFgHiJ",
  metadata={"order_id": "6735"},
)`,
        node: `const customer = await fluxpay.customers.update(
  "cus_Qk9aB2cDeFgHiJ",
  { metadata: { order_id: "6735" } }
);`,
        ruby: `customer = Fluxpay::Customer.update(
  "cus_Qk9aB2cDeFgHiJ",
  metadata: { order_id: "6735" },
)`,
        php: `$customer = $fluxpay->customers->update(
  'cus_Qk9aB2cDeFgHiJ',
  ['metadata' => ['order_id' => '6735']]
);`,
      },
      response: `{
  "id": "cus_Qk9aB2cDeFgHiJ",
  "object": "customer",
  "created": 1719849600,
  "email": "jenny.rosen@example.com",
  "name": "Jenny Rosen",
  "metadata": {
    "order_id": "6735"
  },
  "livemode": false
}`,
    },
    {
      id: 'delete-customer',
      title: 'Delete a customer',
      method: 'DELETE',
      path: '/v1/customers/:id',
      description:
        'Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the customer to be deleted.' },
      ],
      code: {
        curl: `curl -X DELETE https://api.fluxpay.dev/v1/customers/cus_Qk9aB2cDeFgHiJ \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"`,
        python: `deleted = fluxpay.Customer.delete("cus_Qk9aB2cDeFgHiJ")`,
        node: `const deleted = await fluxpay.customers.del(
  "cus_Qk9aB2cDeFgHiJ"
);`,
        ruby: `deleted = Fluxpay::Customer.delete("cus_Qk9aB2cDeFgHiJ")`,
        php: `$deleted = $fluxpay->customers->delete('cus_Qk9aB2cDeFgHiJ', []);`,
      },
      response: `{
  "id": "cus_Qk9aB2cDeFgHiJ",
  "object": "customer",
  "deleted": true
}`,
    },
    {
      id: 'list-customers',
      title: 'List all customers',
      method: 'GET',
      path: '/v1/customers',
      description: 'Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.',
      parameters: [
        { name: 'limit', type: 'integer', required: false, description: 'A limit on the number of objects to be returned, between 1 and 100. Defaults to 10.' },
        { name: 'email', type: 'string', required: false, description: 'A case-sensitive filter on the list based on the customer\'s email field.' },
        { name: 'starting_after', type: 'string', required: false, description: 'A cursor for use in pagination. An object ID that defines your place in the list.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/customers \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -G -d limit=3`,
        python: `customers = fluxpay.Customer.list(limit=3)`,
        node: `const customers = await fluxpay.customers.list({
  limit: 3,
});`,
        ruby: `customers = Fluxpay::Customer.list(limit: 3)`,
        php: `$customers = $fluxpay->customers->all(['limit' => 3]);`,
      },
      response: `{
  "object": "list",
  "url": "/v1/customers",
  "has_more": false,
  "data": [
    {
      "id": "cus_Qk9aB2cDeFgHiJ",
      "object": "customer",
      "created": 1719849600,
      "email": "jenny.rosen@example.com",
      "name": "Jenny Rosen"
    }
  ]
}`,
    },
  ],
}

const paymentIntents: ResourcePage = {
  slug: 'payment-intents',
  title: 'PaymentIntents',
  group: 'Core Resources',
  description:
    'A PaymentIntent guides you through the process of collecting a payment from your customer. We recommend that you create exactly one PaymentIntent for each order or customer session in your system. You can reference the PaymentIntent later to see the history of payment attempts for a particular session.',
  endpoints: [
    {
      id: 'create-payment-intent',
      title: 'Create a PaymentIntent',
      method: 'POST',
      path: '/v1/payment_intents',
      description: 'Creates a PaymentIntent object.',
      prose:
        'After the PaymentIntent is created, attach a payment method and confirm to continue the payment. Learn more about the available payment flows with the Payment Intents API.',
      parameters: [
        { name: 'amount', type: 'integer', required: true, description: 'Amount intended to be collected by this PaymentIntent, in the smallest currency unit (e.g. cents).' },
        { name: 'currency', type: 'string', required: true, description: 'Three-letter ISO currency code, in lowercase. Must be a supported currency.' },
        { name: 'customer', type: 'string', required: false, description: 'ID of the Customer this PaymentIntent belongs to, if one exists.' },
        { name: 'payment_method', type: 'string', required: false, description: 'ID of the payment method to attach to this PaymentIntent.' },
        { name: 'automatic_payment_methods', type: 'object', required: false, description: 'When enabled, Fluxpay will manage the available payment method types shown to the customer.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/payment_intents \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -d amount=2000 \\
  -d currency=usd \\
  -d "automatic_payment_methods[enabled]"=true`,
        python: `intent = fluxpay.PaymentIntent.create(
  amount=2000,
  currency="usd",
  automatic_payment_methods={"enabled": True},
)`,
        node: `const intent = await fluxpay.paymentIntents.create({
  amount: 2000,
  currency: "usd",
  automatic_payment_methods: { enabled: true },
});`,
        ruby: `intent = Fluxpay::PaymentIntent.create(
  amount: 2000,
  currency: "usd",
  automatic_payment_methods: { enabled: true },
)`,
        php: `$intent = $fluxpay->paymentIntents->create([
  'amount' => 2000,
  'currency' => 'usd',
  'automatic_payment_methods' => ['enabled' => true],
]);`,
      },
      response: `{
  "id": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method",
  "client_secret": "pi_3Nz8xK_secret_9aBcDeFgHiJkLmN",
  "created": 1719849600,
  "livemode": false
}`,
    },
    {
      id: 'confirm-payment-intent',
      title: 'Confirm a PaymentIntent',
      method: 'POST',
      path: '/v1/payment_intents/:id/confirm',
      description:
        'Confirm that your customer intends to pay with current or provided payment method. Upon confirmation, the PaymentIntent will attempt to initiate a payment.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the PaymentIntent to confirm.' },
        { name: 'payment_method', type: 'string', required: false, description: 'ID of the payment method to use for this payment.' },
        { name: 'return_url', type: 'string', required: false, description: 'The URL to redirect your customer back to after they authenticate on the payment method’s app or site.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/payment_intents/pi_3Nz8xK/confirm \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -d payment_method=pm_card_visa`,
        python: `intent = fluxpay.PaymentIntent.confirm(
  "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  payment_method="pm_card_visa",
)`,
        node: `const intent = await fluxpay.paymentIntents.confirm(
  "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  { payment_method: "pm_card_visa" }
);`,
        ruby: `intent = Fluxpay::PaymentIntent.confirm(
  "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  payment_method: "pm_card_visa",
)`,
        php: `$intent = $fluxpay->paymentIntents->confirm(
  'pi_3Nz8xK2eZvKYlo2C1aBcDeFg',
  ['payment_method' => 'pm_card_visa']
);`,
      },
      response: `{
  "id": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "payment_method": "pm_card_visa",
  "created": 1719849600,
  "livemode": false
}`,
    },
    {
      id: 'retrieve-payment-intent',
      title: 'Retrieve a PaymentIntent',
      method: 'GET',
      path: '/v1/payment_intents/:id',
      description: 'Retrieves the details of a PaymentIntent that has previously been created.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the PaymentIntent to retrieve.' },
        { name: 'client_secret', type: 'string', required: false, description: 'The client secret of the PaymentIntent. Required if a publishable key is used.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/payment_intents/pi_3Nz8xK \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"`,
        python: `intent = fluxpay.PaymentIntent.retrieve(
  "pi_3Nz8xK2eZvKYlo2C1aBcDeFg"
)`,
        node: `const intent = await fluxpay.paymentIntents.retrieve(
  "pi_3Nz8xK2eZvKYlo2C1aBcDeFg"
);`,
        ruby: `intent = Fluxpay::PaymentIntent.retrieve(
  "pi_3Nz8xK2eZvKYlo2C1aBcDeFg"
)`,
        php: `$intent = $fluxpay->paymentIntents->retrieve(
  'pi_3Nz8xK2eZvKYlo2C1aBcDeFg', []
);`,
      },
      response: `{
  "id": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "created": 1719849600,
  "livemode": false
}`,
    },
  ],
}

const charges: ResourcePage = {
  slug: 'charges',
  title: 'Charges',
  group: 'Core Resources',
  description:
    'The Charge object represents a single attempt to move money into your Fluxpay account. PaymentIntent confirmation is the most common way to create Charges, but transferring funds to a connected account also creates Charges.',
  endpoints: [
    {
      id: 'retrieve-charge',
      title: 'Retrieve a charge',
      method: 'GET',
      path: '/v1/charges/:id',
      description:
        'Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the charge to be retrieved.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/charges/ch_3Nz8xK2eZvKYlo2C1aBcDeFg \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"`,
        python: `charge = fluxpay.Charge.retrieve(
  "ch_3Nz8xK2eZvKYlo2C1aBcDeFg"
)`,
        node: `const charge = await fluxpay.charges.retrieve(
  "ch_3Nz8xK2eZvKYlo2C1aBcDeFg"
);`,
        ruby: `charge = Fluxpay::Charge.retrieve(
  "ch_3Nz8xK2eZvKYlo2C1aBcDeFg"
)`,
        php: `$charge = $fluxpay->charges->retrieve(
  'ch_3Nz8xK2eZvKYlo2C1aBcDeFg', []
);`,
      },
      response: `{
  "id": "ch_3Nz8xK2eZvKYlo2C1aBcDeFg",
  "object": "charge",
  "amount": 2000,
  "amount_captured": 2000,
  "currency": "usd",
  "paid": true,
  "status": "succeeded",
  "customer": "cus_Qk9aB2cDeFgHiJ",
  "payment_intent": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  "receipt_url": "https://pay.fluxpay.dev/receipts/ch_3Nz8xK",
  "created": 1719849600,
  "livemode": false
}`,
    },
    {
      id: 'list-charges',
      title: 'List all charges',
      method: 'GET',
      path: '/v1/charges',
      description:
        'Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.',
      parameters: [
        { name: 'limit', type: 'integer', required: false, description: 'A limit on the number of objects to be returned, between 1 and 100. Defaults to 10.' },
        { name: 'customer', type: 'string', required: false, description: 'Only return charges for the customer specified by this customer ID.' },
        { name: 'created', type: 'object', required: false, description: 'Only return charges that were created during the given date interval.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/charges \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -G -d limit=3`,
        python: `charges = fluxpay.Charge.list(limit=3)`,
        node: `const charges = await fluxpay.charges.list({
  limit: 3,
});`,
        ruby: `charges = Fluxpay::Charge.list(limit: 3)`,
        php: `$charges = $fluxpay->charges->all(['limit' => 3]);`,
      },
      response: `{
  "object": "list",
  "url": "/v1/charges",
  "has_more": true,
  "data": [
    {
      "id": "ch_3Nz8xK2eZvKYlo2C1aBcDeFg",
      "object": "charge",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "paid": true
    }
  ]
}`,
    },
  ],
}

const products: ResourcePage = {
  slug: 'products',
  title: 'Products',
  group: 'Products',
  description:
    'Products describe the specific goods or services you offer to your customers. For example, you might offer a Standard and Premium version of your goods or service; each version would be a separate Product. They can be used in conjunction with Prices to configure pricing in Checkout and Subscriptions.',
  endpoints: [
    {
      id: 'create-product',
      title: 'Create a product',
      method: 'POST',
      path: '/v1/products',
      description: 'Creates a new product object.',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'The product’s name, meant to be displayable to the customer.' },
        { name: 'description', type: 'string', required: false, description: 'The product’s description, meant to be displayable to the customer.' },
        { name: 'active', type: 'boolean', required: false, description: 'Whether the product is currently available for purchase. Defaults to true.' },
        { name: 'metadata', type: 'object', required: false, description: 'Set of key-value pairs that you can attach to the object.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/products \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -d name="Premium Plan"`,
        python: `product = fluxpay.Product.create(name="Premium Plan")`,
        node: `const product = await fluxpay.products.create({
  name: "Premium Plan",
});`,
        ruby: `product = Fluxpay::Product.create(name: "Premium Plan")`,
        php: `$product = $fluxpay->products->create([
  'name' => 'Premium Plan',
]);`,
      },
      response: `{
  "id": "prod_Qk9aB2cDeFgHiJ",
  "object": "product",
  "active": true,
  "name": "Premium Plan",
  "description": null,
  "created": 1719849600,
  "metadata": {},
  "livemode": false
}`,
    },
    {
      id: 'retrieve-product',
      title: 'Retrieve a product',
      method: 'GET',
      path: '/v1/products/:id',
      description: 'Retrieves the details of an existing product. Supply the unique product ID from either a product creation request or the product list.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the product to be retrieved.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/products/prod_Qk9aB2cDeFgHiJ \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"`,
        python: `product = fluxpay.Product.retrieve("prod_Qk9aB2cDeFgHiJ")`,
        node: `const product = await fluxpay.products.retrieve(
  "prod_Qk9aB2cDeFgHiJ"
);`,
        ruby: `product = Fluxpay::Product.retrieve("prod_Qk9aB2cDeFgHiJ")`,
        php: `$product = $fluxpay->products->retrieve('prod_Qk9aB2cDeFgHiJ', []);`,
      },
      response: `{
  "id": "prod_Qk9aB2cDeFgHiJ",
  "object": "product",
  "active": true,
  "name": "Premium Plan",
  "created": 1719849600,
  "livemode": false
}`,
    },
    {
      id: 'list-products',
      title: 'List all products',
      method: 'GET',
      path: '/v1/products',
      description: 'Returns a list of your products. The products are returned sorted by creation date, with the most recently created products appearing first.',
      parameters: [
        { name: 'limit', type: 'integer', required: false, description: 'A limit on the number of objects to be returned, between 1 and 100. Defaults to 10.' },
        { name: 'active', type: 'boolean', required: false, description: 'Only return products that are active or inactive.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/products \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -G -d limit=3`,
        python: `products = fluxpay.Product.list(limit=3)`,
        node: `const products = await fluxpay.products.list({
  limit: 3,
});`,
        ruby: `products = Fluxpay::Product.list(limit: 3)`,
        php: `$products = $fluxpay->products->all(['limit' => 3]);`,
      },
      response: `{
  "object": "list",
  "url": "/v1/products",
  "has_more": false,
  "data": [
    {
      "id": "prod_Qk9aB2cDeFgHiJ",
      "object": "product",
      "active": true,
      "name": "Premium Plan"
    }
  ]
}`,
    },
  ],
}

const checkoutSessions: ResourcePage = {
  slug: 'checkout-sessions',
  title: 'Checkout Sessions',
  group: 'Checkout',
  description:
    'A Checkout Session represents your customer’s session as they pay for one-time purchases or subscriptions through Fluxpay Checkout. We recommend creating a new Session each time your customer attempts to pay. Once payment is successful, the Checkout Session will contain a reference to the Customer, and either the successful PaymentIntent or an active Subscription.',
  endpoints: [
    {
      id: 'create-checkout-session',
      title: 'Create a Checkout Session',
      method: 'POST',
      path: '/v1/checkout/sessions',
      description: 'Creates a Checkout Session object.',
      prose:
        'After creation, redirect your customer to the url returned on the Session to complete the purchase on a Fluxpay-hosted payment page.',
      parameters: [
        { name: 'line_items', type: 'array', required: true, description: 'A list of items the customer is purchasing. Each item includes a price ID and quantity.' },
        { name: 'mode', type: 'string', required: true, description: 'The mode of the Checkout Session. One of payment, setup, or subscription.' },
        { name: 'success_url', type: 'string', required: true, description: 'The URL to which Fluxpay should send customers when payment is complete.' },
        { name: 'cancel_url', type: 'string', required: false, description: 'The URL the customer will be directed to if they cancel payment.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/checkout/sessions \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \\
  -d mode=payment \\
  -d "line_items[0][price]"=price_1Nz8xK \\
  -d "line_items[0][quantity]"=1 \\
  -d success_url="https://example.com/success"`,
        python: `session = fluxpay.checkout.Session.create(
  mode="payment",
  line_items=[{"price": "price_1Nz8xK", "quantity": 1}],
  success_url="https://example.com/success",
)`,
        node: `const session = await fluxpay.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: "price_1Nz8xK", quantity: 1 }],
  success_url: "https://example.com/success",
});`,
        ruby: `session = Fluxpay::Checkout::Session.create(
  mode: "payment",
  line_items: [{ price: "price_1Nz8xK", quantity: 1 }],
  success_url: "https://example.com/success",
)`,
        php: `$session = $fluxpay->checkout->sessions->create([
  'mode' => 'payment',
  'line_items' => [['price' => 'price_1Nz8xK', 'quantity' => 1]],
  'success_url' => 'https://example.com/success',
]);`,
      },
      response: `{
  "id": "cs_test_a1B2c3D4e5F6g7H8",
  "object": "checkout.session",
  "mode": "payment",
  "status": "open",
  "payment_status": "unpaid",
  "url": "https://pay.fluxpay.dev/c/cs_test_a1B2c3D4e5F6g7H8",
  "success_url": "https://example.com/success",
  "amount_total": 2000,
  "currency": "usd",
  "created": 1719849600,
  "livemode": false
}`,
    },
    {
      id: 'retrieve-checkout-session',
      title: 'Retrieve a Checkout Session',
      method: 'GET',
      path: '/v1/checkout/sessions/:id',
      description: 'Retrieves a Checkout Session object.',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'The identifier of the Checkout Session to be retrieved.' },
      ],
      code: {
        curl: `curl https://api.fluxpay.dev/v1/checkout/sessions/cs_test_a1B2c3D4 \\
  -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"`,
        python: `session = fluxpay.checkout.Session.retrieve(
  "cs_test_a1B2c3D4e5F6g7H8"
)`,
        node: `const session = await fluxpay.checkout.sessions.retrieve(
  "cs_test_a1B2c3D4e5F6g7H8"
);`,
        ruby: `session = Fluxpay::Checkout::Session.retrieve(
  "cs_test_a1B2c3D4e5F6g7H8"
)`,
        php: `$session = $fluxpay->checkout->sessions->retrieve(
  'cs_test_a1B2c3D4e5F6g7H8', []
);`,
      },
      response: `{
  "id": "cs_test_a1B2c3D4e5F6g7H8",
  "object": "checkout.session",
  "mode": "payment",
  "status": "complete",
  "payment_status": "paid",
  "customer": "cus_Qk9aB2cDeFgHiJ",
  "payment_intent": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
  "amount_total": 2000,
  "currency": "usd",
  "livemode": false
}`,
    },
  ],
}

export const pages: Record<string, ResourcePage> = {
  customers,
  'payment-intents': paymentIntents,
  charges,
  products,
  'checkout-sessions': checkoutSessions,
}

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
