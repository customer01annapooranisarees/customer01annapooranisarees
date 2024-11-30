const { select } = require('@customer01annapooranisarees/postgres-query-builder');
const { camelCase } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/camelCase');

module.exports = {
  Customer: {
    group: async ({ groupId }, _, { pool }) => {
      const group = await select()
        .from('customer_group')
        .where('customer_group.customer_group_id', '=', groupId)
        .load(pool);
      return group ? camelCase(group) : null;
    }
  }
};
