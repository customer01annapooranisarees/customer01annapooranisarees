const { currencies } = require('@annapoorani/annapoorani/src/lib/locale/currencies');

module.exports = {
  Query: {
    currencies: () => currencies
  }
};
