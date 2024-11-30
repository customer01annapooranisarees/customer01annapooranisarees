const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getCustomersBaseQuery = () => {
  const query = select().from('customer');

  return query;
};
