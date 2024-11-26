/* eslint-disable camelcase */
const { select } = require('@annapoorani/postgres-query-builder');
const { pool } = require('@annapoorani/annapoorani/src/lib/postgres/connection');
const { getCart } = require('./cart/Cart');

module.exports = exports;

/**
 * This function return a Cart object by the session ID.
 * @param {string} sid : The session ID
 * @returns {Promise<Cart>}
 */
exports.getCurrentCart = async (sid) => {
  // Try to get the cart by the session id first
  const cartBySid = await select()
    .from('cart')
    .where('status', '=', 1)
    .andWhere('sid', '=', sid)
    .load(pool);

  if (cartBySid) {
    const cart = await getCart(cartBySid.uuid);
    return cart;
  } else {
    return null;
  }
};
