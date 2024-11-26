const { getConfig } = require('@annapoorani/annapoorani/src/lib/util/getConfig');

module.exports.getAdminSessionCookieName = () =>
  getConfig('system.session.adminCookieName', 'asid');
