const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports = {
  Setting: {
    customerAddressSchema: () => getConfig('customer.addressSchema', undefined)
  }
};
