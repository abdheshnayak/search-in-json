export const data = {
  sample: [[], {}, [], []],
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        city: 'Sample City',
        postalCode: '12345',
        country: 'Neverland',
      },
      orders: [
        {
          orderId: 'A123',
          product: 'Laptop',
          quantity: 1,
        },
        {
          orderId: 'A124',
          product: 'Mobile Phone',
          quantity: 2,
        },
      ],
    },
    {
      id: 2,
      name: 'jane Smith',
      email: 'jane.smith@example.com',
      address: {
        street: '456 Elm St',
        city: 'Test Town',
        postalCode: '67890',
        country: 'Neverland',
      },
      orders: [
        {
          orderId: 'B123',
          product: 'Book',
          quantity: 3,
        },
      ],
    },
  ],
  kk: {},
  mp: [
    `k
klksjflskjdfklsjflskjdflskjdflskjdflskjdflskdjfffffffffff kkkkkkkkkkkkkkkkkkkkkkkkkk



kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk lkj lllkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`,
  ],
  products: [
    {
      productId: 'P001',
      name: 'Laptop',
      price: 1000.5,
      manufacturer: 'Tech Corp',
    },
    {
      productId: 'P002',
      name: 'Mobile Phone',
      price: 500.25,
      manufacturer: 'Mobile Inc',
    },
    {
      productId: 'P003',
      name: 'Book',
      price: 20.0,
      manufacturer: 'Book Publishers',
    },
  ],
  settings: {
    currency: 'USD',
    language: 'en-US',
    theme: 'dark',
  },
  notifications: [
    {
      id: 1,
      message: 'New order received',
      timestamp: '2023-09-20T12:00:00Z',
    },
    {
      id: 2,
      message: 'Order shipped',
      timestamp: '2023-09-20T15:00:00Z',
    },
  ],
};
