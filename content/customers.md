---
slug: customers
title: Customers
group: Core Resources
description: Customer objects allow you to perform recurring charges, track multiple charges, and store payment methods that are associated with the same customer. The API allows you to create, retrieve, update, and delete customers.
endpoints:
  - id: create-customer
    title: Create a customer
    method: POST
    path: /v1/customers
    description: Creates a new customer object.
    prose: Returns the customer object if the update succeeded. Raises an error if create parameters are invalid (for example, specifying an invalid email).
    parameters:
      - name: email
        type: string
        required: false
        description: The customer's email address. It's displayed alongside the customer in your dashboard and can be useful for searching and tracking.
      - name: name
        type: string
        required: false
        description: The customer's full name or business name.
      - name: description
        type: string
        required: false
        description: An arbitrary string attached to the object. Often useful for displaying to users.
      - name: phone
        type: string
        required: false
        description: The customer's phone number.
      - name: metadata
        type: object
        required: false
        description: Set of key-value pairs that you can attach to the object for storing additional structured information.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d email="jenny.rosen@example.com" \
          -d name="Jenny Rosen"
      python: |-
        import fluxpay
        fluxpay.api_key = "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg"

        customer = fluxpay.Customer.create(
          email="jenny.rosen@example.com",
          name="Jenny Rosen",
        )
      node: |-
        const customer = await fluxpay.customers.create({
          email: "jenny.rosen@example.com",
          name: "Jenny Rosen",
        });
      ruby: |-
        customer = Fluxpay::Customer.create(
          email: "jenny.rosen@example.com",
          name: "Jenny Rosen",
        )
      php: |-
        $customer = $fluxpay->customers->create([
          'email' => 'jenny.rosen@example.com',
          'name' => 'Jenny Rosen',
        ]);
    response: |-
      {
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
      }
  - id: retrieve-customer
    title: Retrieve a customer
    method: GET
    path: /v1/customers/:id
    description: Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the customer to be retrieved.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers/cus_Qk9aB2cDeFgHiJ \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"
      python: customer = fluxpay.Customer.retrieve("cus_Qk9aB2cDeFgHiJ")
      node: |-
        const customer = await fluxpay.customers.retrieve(
          "cus_Qk9aB2cDeFgHiJ"
        );
      ruby: customer = Fluxpay::Customer.retrieve("cus_Qk9aB2cDeFgHiJ")
      php: $customer = $fluxpay->customers->retrieve('cus_Qk9aB2cDeFgHiJ', []);
    response: |-
      {
        "id": "cus_Qk9aB2cDeFgHiJ",
        "object": "customer",
        "created": 1719849600,
        "email": "jenny.rosen@example.com",
        "name": "Jenny Rosen",
        "balance": 0,
        "currency": "usd",
        "metadata": {},
        "livemode": false
      }
  - id: update-customer
    title: Update a customer
    method: POST
    path: /v1/customers/:id
    description: Updates the specified customer by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
    prose: This request accepts mostly the same arguments as the customer creation call.
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the customer to be updated.
      - name: email
        type: string
        required: false
        description: The customer's email address.
      - name: name
        type: string
        required: false
        description: The customer's full name or business name.
      - name: metadata
        type: object
        required: false
        description: Set of key-value pairs to attach to the object. Set a key to an empty string to remove it.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers/cus_Qk9aB2cDeFgHiJ \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d "metadata[order_id]"=6735
      python: |-
        customer = fluxpay.Customer.modify(
          "cus_Qk9aB2cDeFgHiJ",
          metadata={"order_id": "6735"},
        )
      node: |-
        const customer = await fluxpay.customers.update(
          "cus_Qk9aB2cDeFgHiJ",
          { metadata: { order_id: "6735" } }
        );
      ruby: |-
        customer = Fluxpay::Customer.update(
          "cus_Qk9aB2cDeFgHiJ",
          metadata: { order_id: "6735" },
        )
      php: |-
        $customer = $fluxpay->customers->update(
          'cus_Qk9aB2cDeFgHiJ',
          ['metadata' => ['order_id' => '6735']]
        );
    response: |-
      {
        "id": "cus_Qk9aB2cDeFgHiJ",
        "object": "customer",
        "created": 1719849600,
        "email": "jenny.rosen@example.com",
        "name": "Jenny Rosen",
        "metadata": {
          "order_id": "6735"
        },
        "livemode": false
      }
  - id: delete-customer
    title: Delete a customer
    method: DELETE
    path: /v1/customers/:id
    description: Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.
    prose: |-
      {% callout type="warning" title="This action is irreversible" %}
      Deleting a customer permanently removes the record and immediately cancels any active subscriptions. There is no way to recover a deleted customer.
      {% /callout %}
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the customer to be deleted.
    code:
      curl: |-
        curl -X DELETE https://api.fluxpay.dev/v1/customers/cus_Qk9aB2cDeFgHiJ \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"
      python: deleted = fluxpay.Customer.delete("cus_Qk9aB2cDeFgHiJ")
      node: |-
        const deleted = await fluxpay.customers.del(
          "cus_Qk9aB2cDeFgHiJ"
        );
      ruby: deleted = Fluxpay::Customer.delete("cus_Qk9aB2cDeFgHiJ")
      php: $deleted = $fluxpay->customers->delete('cus_Qk9aB2cDeFgHiJ', []);
    response: |-
      {
        "id": "cus_Qk9aB2cDeFgHiJ",
        "object": "customer",
        "deleted": true
      }
  - id: list-customers
    title: List all customers
    method: GET
    path: /v1/customers
    description: Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.
    parameters:
      - name: limit
        type: integer
        required: false
        description: A limit on the number of objects to be returned, between 1 and 100. Defaults to 10.
      - name: email
        type: string
        required: false
        description: A case-sensitive filter on the list based on the customer's email field.
      - name: starting_after
        type: string
        required: false
        description: A cursor for use in pagination. An object ID that defines your place in the list.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/customers \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -G -d limit=3
      python: customers = fluxpay.Customer.list(limit=3)
      node: |-
        const customers = await fluxpay.customers.list({
          limit: 3,
        });
      ruby: 'customers = Fluxpay::Customer.list(limit: 3)'
      php: $customers = $fluxpay->customers->all(['limit' => 3]);
    response: |-
      {
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
      }
---
