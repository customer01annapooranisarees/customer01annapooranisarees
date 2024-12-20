const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');

module.exports = {
  Product: {
    editUrl: (product) => buildUrl('productEdit', { id: product.uuid }),
    updateApi: (product) => buildUrl('updateProduct', { id: product.uuid }),
    deleteApi: (product) => buildUrl('deleteProduct', { id: product.uuid })
  }
};
