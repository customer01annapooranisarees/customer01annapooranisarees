const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports = {
  Setting: {
    showShippingNote: () => getConfig('checkout.showShippingNote', true)
  }
};
