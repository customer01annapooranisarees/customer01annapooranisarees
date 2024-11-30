const { emit } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/event/emitter');
const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const { select } = require('@customer01annapooranisarees/postgres-query-builder');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  // Get the order data from $body
  const newOrder = response.$body?.data || {};
  if (newOrder.payment_method !== 'cod') {
    return next();
  } else {
    const order = await select()
      .from('order')
      .where('order_id', '=', newOrder.order_id)
      .load(pool);
    await emit('order_placed', { ...order });
    return next();
  }
};
