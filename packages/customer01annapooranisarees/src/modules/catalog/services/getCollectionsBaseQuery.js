const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getCollectionsBaseQuery = () => {
  const query = select().from('collection');
  return query;
};
