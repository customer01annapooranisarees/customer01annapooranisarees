// https://github.com/node-config/node-config/issues/578
process.env.ALLOW_CONFIG_MUTATIONS = true;
require('dotenv').config();
const { start } = require('@customer01annapooranisarees/customer01annapooranisarees/bin/lib/startUp');

(async () => {
  await start();
})();
