// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const ratings = [...Array(5).keys()].map(id => ({ id: id + 1, style: 'width: 0%', value: 0, selected: false }));
const toppings = [...Array(36).keys()].map(id => `tp${id + 1}`);
const pizzas = [...Array(10).keys()].map(id => `pz${id + 1}`);

export const environment = {
  production: false,
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
    apiKey: 'xxx',
    authDomain: 'xxx',
    projectId: 'xxx',
    storageBucket: 'xxx',
    messagingSenderId: 'xxx',
    appId: 'xxx',
    measurementId: 'xxx'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
