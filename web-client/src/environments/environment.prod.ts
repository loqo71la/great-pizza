const ratings = [...Array(5).keys()].map(id => ({ id: id + 1, style: 'width: 0%', value: 0, selected: false }));
const toppings = [...Array(36).keys()].map(id => `tp${id + 1}`);
const pizzas = [...Array(10).keys()].map(id => `pz${id + 1}`);

export const environment = {
  production: true,
  api: {
    url: 'https://localhost:5001/api',
    error: 'The server encountered an internal error and was unable to complete your request.',
    expirationTime: 180000,
    limit: 50
  },
  headers: {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    toppings,
    pizzas
  },
  ratings,
  sorters: {
    pizzas: [
      { id: 'date', name: 'Last updated' },
      { id: 'rating', name: 'Top rated' },
      { id: 'name-asc', name: 'Name A-Z' },
      { id: 'name-desc', name: 'Name Z-A' }
    ],
    toppings: [
      { id: 'date', name: 'Last updated' },
      { id: 'price-asc', name: 'Price low to high' },
      { id: 'price-desc', name: 'Price high to low' },
      { id: 'name-asc', name: 'Name A-Z' },
      { id: 'name-desc', name: 'Name Z-A' }
    ]
  },
  firebase: {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx",
    measurementId: "xxx"
  }
};
