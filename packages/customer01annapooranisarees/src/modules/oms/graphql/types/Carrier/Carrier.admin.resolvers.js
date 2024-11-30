const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports = {
  Query: {
    carriers: () => {
      const carriers = getConfig('oms.carriers', {});
      return Object.keys(carriers).map((key) => ({
          ...carriers[key],
          code: key
        }));
    }
  }
};
