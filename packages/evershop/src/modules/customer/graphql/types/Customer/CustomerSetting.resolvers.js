const { getConfig } = require('@annapoorani/annapoorani/src/lib/util/getConfig');

module.exports = {
  Setting: {
    customerAddressSchema: () => getConfig('customer.addressSchema', undefined)
  }
};
