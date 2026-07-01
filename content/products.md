---
slug: products
title: Products
group: Products
description: Products describe the specific goods or services you offer to your customers. For example, you might offer a Standard and Premium version of your goods or service; each version would be a separate Product. They can be used in conjunction with Prices to configure pricing in Checkout and Subscriptions.
endpoints:
  - id: create-product
    title: Create a product
    method: POST
    path: /v1/products
    description: Creates a new product object.
    parameters:
      - name: name
        type: string
        required: true
        description: The product’s name, meant to be displayable to the customer.
      - name: description
        type: string
        required: false
        description: The product’s description, meant to be displayable to the customer.
      - name: active
        type: boolean
        required: false
        description: Whether the product is currently available for purchase. Defaults to true.
      - name: metadata
        type: object
        required: false
        description: Set of key-value pairs that you can attach to the object.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/products \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -d name="Premium Plan"
      python: product = fluxpay.Product.create(name="Premium Plan")
      node: |-
        const product = await fluxpay.products.create({
          name: "Premium Plan",
        });
      ruby: 'product = Fluxpay::Product.create(name: "Premium Plan")'
      php: |-
        $product = $fluxpay->products->create([
          'name' => 'Premium Plan',
        ]);
    response: |-
      {
        "id": "prod_Qk9aB2cDeFgHiJ",
        "object": "product",
        "active": true,
        "name": "Premium Plan",
        "description": null,
        "created": 1719849600,
        "metadata": {},
        "livemode": false
      }
  - id: retrieve-product
    title: Retrieve a product
    method: GET
    path: /v1/products/:id
    description: Retrieves the details of an existing product. Supply the unique product ID from either a product creation request or the product list.
    parameters:
      - name: id
        type: string
        required: true
        description: The identifier of the product to be retrieved.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/products/prod_Qk9aB2cDeFgHiJ \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:"
      python: product = fluxpay.Product.retrieve("prod_Qk9aB2cDeFgHiJ")
      node: |-
        const product = await fluxpay.products.retrieve(
          "prod_Qk9aB2cDeFgHiJ"
        );
      ruby: product = Fluxpay::Product.retrieve("prod_Qk9aB2cDeFgHiJ")
      php: $product = $fluxpay->products->retrieve('prod_Qk9aB2cDeFgHiJ', []);
    response: |-
      {
        "id": "prod_Qk9aB2cDeFgHiJ",
        "object": "product",
        "active": true,
        "name": "Premium Plan",
        "created": 1719849600,
        "livemode": false
      }
  - id: list-products
    title: List all products
    method: GET
    path: /v1/products
    description: Returns a list of your products. The products are returned sorted by creation date, with the most recently created products appearing first.
    parameters:
      - name: limit
        type: integer
        required: false
        description: A limit on the number of objects to be returned, between 1 and 100. Defaults to 10.
      - name: active
        type: boolean
        required: false
        description: Only return products that are active or inactive.
    code:
      curl: |-
        curl https://api.fluxpay.dev/v1/products \
          -u "fpk_test_51Nz8xK2eZvKYlo2C9aBcDeFg:" \
          -G -d limit=3
      python: products = fluxpay.Product.list(limit=3)
      node: |-
        const products = await fluxpay.products.list({
          limit: 3,
        });
      ruby: 'products = Fluxpay::Product.list(limit: 3)'
      php: $products = $fluxpay->products->all(['limit' => 3]);
    response: |-
      {
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
      }
---
