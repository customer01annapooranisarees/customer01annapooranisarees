const { getConfig } = require('@customer01annapooranisarees/annapoorani/src/lib/util/getConfig');

module.exports = {
  Setting: {
    showShippingNote: () => getConfig('checkout.showShippingNote', true)
  }
};
