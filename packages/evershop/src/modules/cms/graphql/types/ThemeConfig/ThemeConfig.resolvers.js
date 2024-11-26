const { getConfig } = require('@annapoorani/annapoorani/src/lib/util/getConfig');

module.exports = {
  Query: {
    themeConfig: () => getConfig('themeConfig')
  }
};
