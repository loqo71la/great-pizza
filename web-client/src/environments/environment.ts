// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    url: 'https://localhost:5001/api',
    error: 'The server encountered an internal error and was unable to complete your request.',
    limit: 30
  },
  headers: {
    toppings: ['tp1', 'tp2', 'tp3', 'tp4', 'tp5', 'tp6', 'tp7', 'tp8', 'tp9', 'tp10', 'tp11', 'tp12'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    pizzas: ['pz1', 'pz2', 'pz3', 'pz4'],
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
