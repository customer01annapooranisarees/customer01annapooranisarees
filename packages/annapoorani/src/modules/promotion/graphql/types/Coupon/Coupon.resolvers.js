const { buildUrl } = require('@customer01annapooranisarees/annapoorani/src/lib/router/buildUrl');

module.exports = {
  Cart: {
    applyCouponApi: (cart) => buildUrl('couponApply', { cart_id: cart.uuid })
  }
};
