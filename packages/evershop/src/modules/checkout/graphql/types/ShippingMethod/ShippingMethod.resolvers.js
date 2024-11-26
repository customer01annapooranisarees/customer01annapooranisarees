const { select } = require('@annapoorani/postgres-query-builder');
const { pool } = require('@annapoorani/annapoorani/src/lib/postgres/connection');
const { camelCase } = require('@annapoorani/annapoorani/src/lib/util/camelCase');
const { buildUrl } = require('@annapoorani/annapoorani/src/lib/router/buildUrl');

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
