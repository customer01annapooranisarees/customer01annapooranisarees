const { select } = require('@customer01annapooranisarees/postgres-query-builder');
const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const { camelCase } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/camelCase');
const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');

module.exports = {
  Query: {
    shippingMethods: async () => {
      const shippingMethods = await select()
        .from('shipping_method')
        .orderBy('shipping_method_id', 'DESC')
        .execute(pool);
      return shippingMethods.map((row) => camelCase(row));
    }
  },
  ShippingMethod: {
    updateApi: ({ uuid }) => buildUrl('updateShippingMethod', { id: uuid })
  }
};
