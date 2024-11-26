const { getConfig } = require('@annapoorani/annapoorani/src/lib/util/getConfig');

module.exports = {
  Setting: {
    showShippingNote: () => getConfig('checkout.showShippingNote', true)
  }
};
