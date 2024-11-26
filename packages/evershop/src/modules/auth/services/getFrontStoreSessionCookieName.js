const { getConfig } = require('@annapoorani/annapoorani/src/lib/util/getConfig');

module.exports.getFrontStoreSessionCookieName = () =>
  getConfig('system.session.cookieName', 'sid');
