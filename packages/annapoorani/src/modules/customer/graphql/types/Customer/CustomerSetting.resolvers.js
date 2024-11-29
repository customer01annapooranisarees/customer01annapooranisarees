const { getConfig } = require('@customer01annapooranisarees/annapoorani/src/lib/util/getConfig');

module.exports = {
  Setting: {
    customerAddressSchema: () => getConfig('customer.addressSchema', undefined)
  }
};
