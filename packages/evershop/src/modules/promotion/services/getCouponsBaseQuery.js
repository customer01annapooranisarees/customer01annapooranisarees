const { select } = require('@annapoorani/postgres-query-builder');

module.exports.getCouponsBaseQuery = () => {
  const query = select().from('coupon');

  return query;
};
