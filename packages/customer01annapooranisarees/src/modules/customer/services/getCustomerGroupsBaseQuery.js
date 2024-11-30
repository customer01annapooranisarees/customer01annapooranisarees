const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getCustomerGroupsBaseQuery = () => {
  const query = select().from('customer_group');

  return query;
};
