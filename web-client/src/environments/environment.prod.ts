const toppings = [...Array(36).keys()].map(id => `tp${id + 1}`);
const pizzas = [...Array(12).keys()].map(id => `pz${id + 1}`);

export const environment = {
  production: true,
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
