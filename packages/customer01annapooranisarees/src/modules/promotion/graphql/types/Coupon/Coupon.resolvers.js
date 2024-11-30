const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');

module.exports = {
  Cart: {
    applyCouponApi: (cart) => buildUrl('couponApply', { cart_id: cart.uuid })
  }
};
