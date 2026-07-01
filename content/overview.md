---
title: Fluxpay API Reference
intro: |-
  The Fluxpay API is organized around [REST](#). Our API has predictable resource-oriented URLs, accepts [form-encoded](#) request bodies, returns [JSON-encoded](#) responses, and uses standard HTTP response codes, authentication, and verbs.

  You can use the Fluxpay API in [sandboxes](#) without affecting your live data or interacting with banking networks. The API key that you use to [authenticate](#) the request determines whether the request runs in live mode or in a sandbox. Sandboxes support all [v2 APIs](#). Test mode sandboxes support some [v2 APIs](#).

  The Fluxpay API doesn't support bulk updates. You can work on only one object per request.

  The Fluxpay API differs for every account as we release new [versions](#) and tailor functionality. [Log in](#) to see docs with your test key and data.
baseUrl: https://api.fluxpay.dev
sections:
  - id: authentication
    heading: Authentication
    body: |-
      The Fluxpay API uses API keys to authenticate requests. All requests are made to the base URL https://{% $baseUrl %}. You can view and manage your API keys in the Fluxpay Dashboard. Test mode keys have the prefix `fpk_test_` and live mode keys have the prefix `fpk_live_`.

      Authentication is performed via HTTP Basic Auth. Provide your API key as the basic auth username value — you do not need to provide a password.

      {% callout type="warning" title="Keep your keys secret" %}
      Your API keys carry many privileges, so keep them secure. Do not share your secret API keys in publicly accessible areas such as GitHub or client-side code.
      {% /callout %}
    method: GET
    path: /v1/customers
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"
      python: |-
        import fluxpay
        fluxpay.api_key = "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg"

        fluxpay.Customer.list()
      node: |-
        import Fluxpay from "fluxpay";
        const fluxpay = new Fluxpay("fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg");

        await fluxpay.customers.list();
      ruby: |-
        require "fluxpay"
        Fluxpay.api_key = "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg"

        Fluxpay::Customer.list()
      php: |-
        <?php
        $fluxpay = new \Fluxpay\FluxpayClient('fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg');

        $fluxpay->customers->all();
    response: |-
      {
        "object": "list",
        "url": "/v1/customers",
        "has_more": false,
        "data": []
      }
  - id: errors
    heading: Errors
    body: |-
      Fluxpay uses conventional HTTP response codes to indicate the success or failure of an API request:

      - Codes in the `2xx` range indicate success.
      - Codes in the `4xx` range indicate an error that failed given the information provided (a required parameter was omitted, a charge failed, etc.).
      - Codes in the `5xx` range indicate an error with Fluxpay's servers.

      When a request fails, Fluxpay returns an error object with a `type`, a `code`, and a human-readable `message`. Common types include `api_error`, `card_error`, and `invalid_request_error`.
    method: POST
    path: /v1/charges
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/charges \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d amount=2000
      python: |-
        # currency is required
        fluxpay.Charge.create(amount=2000)
      node: |-
        // currency is required
        await fluxpay.charges.create({ amount: 2000 });
      ruby: |-
        # currency is required
        Fluxpay::Charge.create(amount: 2000)
      php: |-
        // currency is required
        $fluxpay->charges->create(['amount' => 2000]);
    response: |-
      {
        "error": {
          "type": "invalid_request_error",
          "code": "parameter_missing",
          "message": "Missing required param: currency.",
          "param": "currency"
        }
      }
  - id: expanding-responses
    heading: Expanding responses
    body: |-
      Many objects let you request additional information as an expanded response by using the `expand` request parameter. For example, a Charge's `customer` field returns an ID by default, but you can expand it to the full customer object.

      You can expand recursively by specifying nested fields, such as `customer.default_source`, and you can expand multiple objects at once by identifying multiple items in the `expand` array.
    method: GET
    path: /v1/charges/:id
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/charges/ch_3Nz8xK \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d "expand[]"=customer
      python: |-
        fluxpay.Charge.retrieve(
          "ch_3Nz8xK",
          expand=["customer"],
        )
      node: |-
        await fluxpay.charges.retrieve("ch_3Nz8xK", {
          expand: ["customer"],
        });
      ruby: |-
        Fluxpay::Charge.retrieve(
          "ch_3Nz8xK",
          expand: ["customer"],
        )
      php: |-
        $fluxpay->charges->retrieve(
          'ch_3Nz8xK',
          ['expand' => ['customer']]
        );
  - id: idempotent-requests
    heading: Idempotent requests
    body: |-
      The API supports idempotency for safely retrying requests without accidentally performing the same operation twice. When creating or updating an object, provide an `Idempotency-Key` header, and Fluxpay saves the resulting status code and body of the first request made for any given key.

      Keys are eligible to be removed from the system automatically after they're at least 24 hours old, and a new request is generated if a key is reused after the original has been pruned.
    method: POST
    path: /v1/charges
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/charges \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -H "Idempotency-Key: a1b2c3d4e5" \
          -d amount=2000 -d currency=usd
      python: |-
        fluxpay.Charge.create(
          amount=2000, currency="usd",
          idempotency_key="a1b2c3d4e5",
        )
      node: |-
        await fluxpay.charges.create(
          { amount: 2000, currency: "usd" },
          { idempotencyKey: "a1b2c3d4e5" }
        );
      ruby: |-
        Fluxpay::Charge.create(
          { amount: 2000, currency: "usd" },
          { idempotency_key: "a1b2c3d4e5" }
        )
      php: |-
        $fluxpay->charges->create(
          ['amount' => 2000, 'currency' => 'usd'],
          ['idempotency_key' => 'a1b2c3d4e5']
        );
  - id: include-dependent-response-values
    heading: Include-dependent response values (API v2)
    body: |-
      Some response fields aren't returned by default because computing them adds latency to the request. In API v2, you can request these values with the `include` parameter.

      Included values reflect the state of the object at the time of the request, and aren't refreshed when you retrieve the object again without the `include` parameter.
    method: GET
    path: /v2/customers/:id
    code:
      curl: |-
        curl https://api.fluxpay.dev/v2/customers/cus_Qk9aB2 \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d "include[]"=balance
      python: |-
        fluxpay.v2.Customer.retrieve(
          "cus_Qk9aB2",
          include=["balance"],
        )
      node: |-
        await fluxpay.v2.customers.retrieve("cus_Qk9aB2", {
          include: ["balance"],
        });
      ruby: |-
        Fluxpay::V2::Customer.retrieve(
          "cus_Qk9aB2",
          include: ["balance"],
        )
      php: |-
        $fluxpay->v2->customers->retrieve(
          'cus_Qk9aB2',
          ['include' => ['balance']]
        );
  - id: metadata
    heading: Metadata
    body: |-
      Updateable Fluxpay objects—including Charge, Customer, and PaymentIntent—have a `metadata` parameter. You can use this parameter to attach key-value data to these objects.

      Metadata is useful for storing additional, structured information on an object. For example, you could store your unique identifier from your system on a Fluxpay Charge. Metadata isn't shown to customers or used by Fluxpay to process payments.
    method: POST
    path: /v1/customers/:id
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers/cus_Qk9aB2 \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d "metadata[order_id]"=6735
      python: |-
        fluxpay.Customer.modify(
          "cus_Qk9aB2",
          metadata={"order_id": "6735"},
        )
      node: |-
        await fluxpay.customers.update("cus_Qk9aB2", {
          metadata: { order_id: "6735" },
        });
      ruby: |-
        Fluxpay::Customer.update(
          "cus_Qk9aB2",
          metadata: { order_id: "6735" },
        )
      php: |-
        $fluxpay->customers->update(
          'cus_Qk9aB2',
          ['metadata' => ['order_id' => '6735']]
        );
  - id: pagination
    heading: Pagination
    body: 'All top-level API resources have support for bulk fetches via "list" API methods. These list API methods share a common structure, taking at least these three parameters: `limit`, `starting_after`, and `ending_before`. Fluxpay uses cursor-based pagination via the `starting_after` and `ending_before` parameters.'
    method: GET
    path: /v1/customers
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -G -d limit=3 -d starting_after=cus_Qk9aB2
      python: |-
        fluxpay.Customer.list(
          limit=3,
          starting_after="cus_Qk9aB2",
        )
      node: |-
        await fluxpay.customers.list({
          limit: 3,
          starting_after: "cus_Qk9aB2",
        });
      ruby: |-
        Fluxpay::Customer.list(
          limit: 3,
          starting_after: "cus_Qk9aB2",
        )
      php: |-
        $fluxpay->customers->all([
          'limit' => 3,
          'starting_after' => 'cus_Qk9aB2',
        ]);
    response: |-
      {
        "object": "list",
        "url": "/v1/customers",
        "has_more": true,
        "data": [
          { "id": "cus_Rt4cD5eFgHiJkL", "object": "customer" }
        ]
      }
  - id: request-ids
    heading: Request IDs
    body: |-
      Each API request has an associated request identifier. You can find this value in the response headers, under `Request-Id`, and in the Fluxpay Dashboard under Logs.

      If you need to contact us about a specific request, providing the request identifier will help us resolve your issue faster.
  - id: connected-accounts
    heading: Connected accounts
    body: |-
      To act as connected accounts, clients can issue requests using the connected account's identifier (which starts with `acct_`) in the `Fluxpay-Account` header. Requests are then made in the context of that account.
    method: POST
    path: /v1/charges
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/charges \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -H "Fluxpay-Account: acct_1Nz8xK2eZvKYlo2C" \
          -d amount=2000 -d currency=usd
      python: |-
        fluxpay.Charge.create(
          amount=2000, currency="usd",
          fluxpay_account="acct_1Nz8xK2eZvKYlo2C",
        )
      node: |-
        await fluxpay.charges.create(
          { amount: 2000, currency: "usd" },
          { fluxpayAccount: "acct_1Nz8xK2eZvKYlo2C" }
        );
      ruby: |-
        Fluxpay::Charge.create(
          { amount: 2000, currency: "usd" },
          { fluxpay_account: "acct_1Nz8xK2eZvKYlo2C" }
        )
      php: |-
        $fluxpay->charges->create(
          ['amount' => 2000, 'currency' => 'usd'],
          ['fluxpay_account' => 'acct_1Nz8xK2eZvKYlo2C']
        );
  - id: versioning
    heading: Versioning
    body: |-
      When we make backwards-incompatible changes to the API, we release new dated versions. The current version is `2026-06-30`. You can view your account's API version in the Fluxpay Dashboard.

      To override the version for a single request—useful when testing an upgrade—set the `Fluxpay-Version` header. Read our API upgrades guide to see a list of changes made in each version.
    method: GET
    path: /v1/customers
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -H "Fluxpay-Version: 2026-06-30"
      python: |-
        fluxpay.Customer.list(
          fluxpay_version="2026-06-30",
        )
      node: |-
        await fluxpay.customers.list(
          {}, { apiVersion: "2026-06-30" }
        );
      ruby: |-
        Fluxpay::Customer.list(
          {}, { fluxpay_version: "2026-06-30" }
        )
      php: |-
        $fluxpay->customers->all(
          [], ['fluxpay_version' => '2026-06-30']
        );
---
