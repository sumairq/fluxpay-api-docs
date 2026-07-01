---
slug: payment-intents
title: PaymentIntents
group: Core Resources
description: A PaymentIntent guides you through the process of collecting a payment from your customer. We recommend that you create exactly one PaymentIntent for each order or customer session in your system. You can reference the PaymentIntent later to see the history of payment attempts for a particular session.
endpoints:
  - id: create-payment-intent
    title: Create a PaymentIntent
    method: POST
    path: /v1/payment_intents
    description: Creates a PaymentIntent object.
    prose: After the PaymentIntent is created, attach a payment method and confirm to continue the payment. Learn more about the available payment flows with the Payment Intents API.
    parameters:
      - name: amount
        type: integer
        required: true
        description: Amount intended to be collected by this PaymentIntent, in the smallest currency unit (e.g. cents).
      - name: currency
        type: string
        required: true
        description: Three-letter ISO currency code, in lowercase. Must be a supported currency.
      - name: customer
        type: string
        required: false
        description: ID of the Customer this PaymentIntent belongs to, if one exists.
      - name: payment_method
        type: string
        required: false
        description: ID of the payment method to attach to this PaymentIntent.
      - name: automatic_payment_methods
        type: object
        required: false
        description: When enabled, Fluxpay will manage the available payment method types shown to the customer.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/payment_intents \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d amount=2000 \
          -d currency=usd \
          -d "automatic_payment_methods[enabled]"=true
      python: |-
        intent = fluxpay.PaymentIntent.create(
          amount=2000,
          currency="usd",
          automatic_payment_methods={"enabled": True},
        )
      node: |-
        const intent = await fluxpay.paymentIntents.create({
          amount: 2000,
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        });
      ruby: |-
        intent = Fluxpay::PaymentIntent.create(
          amount: 2000,
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        )
      php: |-
        $intent = $fluxpay->paymentIntents->create([
          'amount' => 2000,
          'currency' => 'usd',
          'automatic_payment_methods' => ['enabled' => true],
        ]);
    response: |-
      {
        "id": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
        "object": "payment_intent",
        "amount": 2000,
        "currency": "usd",
        "status": "requires_payment_method",
        "client_secret": "pi_3Nz8xK_secret_9aBcDeFgHiJkLmN",
        "created": 1719849600,
        "livemode": false
      }
  - id: confirm-payment-intent
    title: Confirm a PaymentIntent
    method: POST
    path: /v1/payment_intents/:id/confirm
    description: Confirm that your customer intends to pay with current or provided payment method. Upon confirmation, the PaymentIntent will attempt to initiate a payment.
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the PaymentIntent to confirm.
      - name: payment_method
        type: string
        required: false
        description: ID of the payment method to use for this payment.
      - name: return_url
        type: string
        required: false
        description: The URL to redirect your customer back to after they authenticate on the payment method’s app or site.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/payment_intents/pi_3Nz8xK/confirm \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d payment_method=pm_card_visa
      python: |-
        intent = fluxpay.PaymentIntent.confirm(
          "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
          payment_method="pm_card_visa",
        )
      node: |-
        const intent = await fluxpay.paymentIntents.confirm(
          "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
          { payment_method: "pm_card_visa" }
        );
      ruby: |-
        intent = Fluxpay::PaymentIntent.confirm(
          "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
          payment_method: "pm_card_visa",
        )
      php: |-
        $intent = $fluxpay->paymentIntents->confirm(
          'pi_3Nz8xK2eZvKYlo2C1aBcDeFg',
          ['payment_method' => 'pm_card_visa']
        );
    response: |-
      {
        "id": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
        "object": "payment_intent",
        "amount": 2000,
        "currency": "usd",
        "status": "succeeded",
        "payment_method": "pm_card_visa",
        "created": 1719849600,
        "livemode": false
      }
  - id: retrieve-payment-intent
    title: Retrieve a PaymentIntent
    method: GET
    path: /v1/payment_intents/:id
    description: Retrieves the details of a PaymentIntent that has previously been created.
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the PaymentIntent to retrieve.
      - name: client_secret
        type: string
        required: false
        description: The client secret of the PaymentIntent. Required if a publishable key is used.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/payment_intents/pi_3Nz8xK \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"
      python: |-
        intent = fluxpay.PaymentIntent.retrieve(
          "pi_3Nz8xK2eZvKYlo2C1aBcDeFg"
        )
      node: |-
        const intent = await fluxpay.paymentIntents.retrieve(
          "pi_3Nz8xK2eZvKYlo2C1aBcDeFg"
        );
      ruby: |-
        intent = Fluxpay::PaymentIntent.retrieve(
          "pi_3Nz8xK2eZvKYlo2C1aBcDeFg"
        )
      php: |-
        $intent = $fluxpay->paymentIntents->retrieve(
          'pi_3Nz8xK2eZvKYlo2C1aBcDeFg', []
        );
    response: |-
      {
        "id": "pi_3Nz8xK2eZvKYlo2C1aBcDeFg",
        "object": "payment_intent",
        "amount": 2000,
        "currency": "usd",
        "status": "succeeded",
        "created": 1719849600,
        "livemode": false
      }
---
