const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getOrdersBaseQuery = () => {
  const query = select().from('order');

  return query;
};
