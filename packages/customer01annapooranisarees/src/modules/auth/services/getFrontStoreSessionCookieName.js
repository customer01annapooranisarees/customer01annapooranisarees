const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports.getFrontStoreSessionCookieName = () =>
  getConfig('system.session.cookieName', 'sid');
