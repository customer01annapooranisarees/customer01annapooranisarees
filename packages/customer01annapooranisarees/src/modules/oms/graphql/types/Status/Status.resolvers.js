const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports = {
  Query: {
    shipmentStatusList: () => {
      const statusList = getConfig('oms.order.shipmentStatus', {});
      return Object.keys(statusList).map((key) => ({
          ...statusList[key],
          code: key
        }));
    },
    paymentStatusList: () => {
      const statusList = getConfig('oms.order.paymentStatus', {});
      return Object.keys(statusList).map((key) => ({
          ...statusList[key],
          code: key
        }));
    }
  }
};
