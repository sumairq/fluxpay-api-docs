---
slug: charges
title: Charges
group: Core Resources
description: The Charge object represents a single attempt to move money into your Fluxpay account. PaymentIntent confirmation is the most common way to create Charges, but transferring funds to a connected account also creates Charges.
endpoints:
  - id: retrieve-charge
    title: Retrieve a charge
    method: GET
    path: /v1/charges/:id
    description: Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request.
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the charge to be retrieved.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/charges/ch_3Nz8xK2eZvKYlo2C1aBcDeFg \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"
      python: |-
        charge = fluxpay.Charge.retrieve(
          "ch_3Nz8xK2eZvKYlo2C1aBcDeFg"
        )
      node: |-
        const charge = await fluxpay.charges.retrieve(
          "ch_3Nz8xK2eZvKYlo2C1aBcDeFg"
        );
      ruby: |-
        charge = Fluxpay::Charge.retrieve(
          "ch_3Nz8xK2eZvKYlo2C1aBcDeFg"
        )
      php: |-
        $charge = $fluxpay->charges->retrieve(
          'ch_3Nz8xK2eZvKYlo2C1aBcDeFg', []
        );
    response: |-
      {
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
      }
  - id: list-charges
    title: List all charges
    method: GET
    path: /v1/charges
    description: Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.
    parameters:
      - name: limit
        type: integer
        required: false
        description: A limit on the number of objects to be returned, between 1 and 100. Defaults to 10.
      - name: customer
        type: string
        required: false
        description: Only return charges for the customer specified by this customer ID.
      - name: created
        type: object
        required: false
        description: Only return charges that were created during the given date interval.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/charges \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -G -d limit=3
      python: charges = fluxpay.Charge.list(limit=3)
      node: |-
        const charges = await fluxpay.charges.list({
          limit: 3,
        });
      ruby: 'charges = Fluxpay::Charge.list(limit: 3)'
      php: $charges = $fluxpay->charges->all(['limit' => 3]);
    response: |-
      {
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
      }
---
