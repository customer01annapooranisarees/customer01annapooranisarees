const { getConfig } = require('@customer01annapooranisarees/annapoorani/src/lib/util/getConfig');

module.exports = {
  Query: {
    themeConfig: () => getConfig('themeConfig')
  }
};
