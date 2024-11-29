const { getConfig } = require('@customer01annapooranisarees/annapoorani/src/lib/util/getConfig');

module.exports.getFrontStoreSessionCookieName = () =>
  getConfig('system.session.cookieName', 'sid');
