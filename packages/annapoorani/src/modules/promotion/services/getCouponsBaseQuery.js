const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getCouponsBaseQuery = () => {
  const query = select().from('coupon');

  return query;
};
