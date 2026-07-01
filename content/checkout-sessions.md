---
slug: checkout-sessions
title: Checkout Sessions
group: Checkout
description: A Checkout Session represents your customer’s session as they pay for one-time purchases or subscriptions through Fluxpay Checkout. We recommend creating a new Session each time your customer attempts to pay. Once payment is successful, the Checkout Session will contain a reference to the Customer, and either the successful PaymentIntent or an active Subscription.
endpoints:
  - id: create-checkout-session
    title: Create a Checkout Session
    method: POST
    path: /v1/checkout/sessions
    description: Creates a Checkout Session object.
    prose: After creation, redirect your customer to the url returned on the Session to complete the purchase on a Fluxpay-hosted payment page.
    parameters:
      - name: line_items
        type: array
        required: true
        description: A list of items the customer is purchasing. Each item includes a price ID and quantity.
      - name: mode
        type: string
        required: true
        description: The mode of the Checkout Session. One of payment, setup, or subscription.
      - name: success_url
        type: string
        required: true
        description: The URL to which Fluxpay should send customers when payment is complete.
      - name: cancel_url
        type: string
        required: false
        description: The URL the customer will be directed to if they cancel payment.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/checkout/sessions \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d mode=payment \
          -d "line_items[0][price]"=price_1Nz8xK \
          -d "line_items[0][quantity]"=1 \
          -d success_url="https://example.com/success"
      python: |-
        session = fluxpay.checkout.Session.create(
          mode="payment",
          line_items=[{"price": "price_1Nz8xK", "quantity": 1}],
          success_url="https://example.com/success",
        )
      node: |-
        const session = await fluxpay.checkout.sessions.create({
          mode: "payment",
          line_items: [{ price: "price_1Nz8xK", quantity: 1 }],
          success_url: "https://example.com/success",
        });
      ruby: |-
        session = Fluxpay::Checkout::Session.create(
          mode: "payment",
          line_items: [{ price: "price_1Nz8xK", quantity: 1 }],
          success_url: "https://example.com/success",
        )
      php: |-
        $session = $fluxpay->checkout->sessions->create([
          'mode' => 'payment',
          'line_items' => [['price' => 'price_1Nz8xK', 'quantity' => 1]],
          'success_url' => 'https://example.com/success',
        ]);
    response: |-
      {
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
      }
  - id: retrieve-checkout-session
    title: Retrieve a Checkout Session
    method: GET
    path: /v1/checkout/sessions/:id
    description: Retrieves a Checkout Session object.
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the Checkout Session to be retrieved.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/checkout/sessions/cs_test_a1B2c3D4 \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"
      python: |-
        session = fluxpay.checkout.Session.retrieve(
          "cs_test_a1B2c3D4e5F6g7H8"
        )
      node: |-
        const session = await fluxpay.checkout.sessions.retrieve(
          "cs_test_a1B2c3D4e5F6g7H8"
        );
      ruby: |-
        session = Fluxpay::Checkout::Session.retrieve(
          "cs_test_a1B2c3D4e5F6g7H8"
        )
      php: |-
        $session = $fluxpay->checkout->sessions->retrieve(
          'cs_test_a1B2c3D4e5F6g7H8', []
        );
    response: |-
      {
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
      }
---
