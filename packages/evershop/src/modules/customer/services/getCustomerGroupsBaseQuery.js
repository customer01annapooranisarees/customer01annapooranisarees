const { select } = require('@annapoorani/postgres-query-builder');

module.exports.getCustomerGroupsBaseQuery = () => {
  const query = select().from('customer_group');

  return query;
};
