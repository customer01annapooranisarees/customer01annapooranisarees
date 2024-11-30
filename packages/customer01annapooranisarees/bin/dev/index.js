// https://github.com/node-config/node-config/issues/578
process.env.ALLOW_CONFIG_MUTATIONS = true;
require('dotenv').config();
const { start } = require('@customer01annapooranisarees/customer01annapooranisarees/bin/lib/startUp');
const { watchComponents } = require('../lib/watch/watchComponents');

(async () => {
  await start(watchComponents);
})();
