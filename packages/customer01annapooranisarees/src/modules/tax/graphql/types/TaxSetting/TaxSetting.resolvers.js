const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports = {
  Setting: {
    priceIncludingTax: () => getConfig('pricing.tax.price_including_tax', false)
  }
};
