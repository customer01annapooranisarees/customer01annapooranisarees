const { select } = require('@annapoorani/postgres-query-builder');

module.exports.getWidgetsBaseQuery = () => {
  const query = select().from('widget');

  return query;
};
