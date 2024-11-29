const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getWidgetsBaseQuery = () => {
  const query = select().from('widget');

  return query;
};
