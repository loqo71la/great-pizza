// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const toppings = [...Array(36).keys()].map(id => `tp${id + 1}`);
const pizzas = [...Array(12).keys()].map(id => `pz${id + 1}`);

export const environment = {
  production: false,
  api: {
    url: 'https://localhost:5001/api',
    error: 'The server encountered an internal error and was unable to complete your request.',
    limit: 50
  },
  headers: {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    toppings,
    pizzas
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
