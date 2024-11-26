const { select } = require('@annapoorani/postgres-query-builder');

module.exports.getCustomersBaseQuery = () => {
  const query = select().from('customer');

  return query;
};
