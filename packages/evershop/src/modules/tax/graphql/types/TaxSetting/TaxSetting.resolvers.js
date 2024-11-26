const { getConfig } = require('@annapoorani/annapoorani/src/lib/util/getConfig');

module.exports = {
  Setting: {
    priceIncludingTax: () => getConfig('pricing.tax.price_including_tax', false)
  }
};
