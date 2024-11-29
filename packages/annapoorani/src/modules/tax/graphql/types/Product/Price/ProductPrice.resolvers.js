const {
  toPrice
} = require('@customer01annapooranisarees/annapoorani/src/modules/checkout/services/toPrice');

module.exports = {
  Product: {
    price: async (product) => {
      const price = toPrice(product.price);
      return {
        regular: price,
        special: price // TODO: implement special price
      };
    }
  }
};