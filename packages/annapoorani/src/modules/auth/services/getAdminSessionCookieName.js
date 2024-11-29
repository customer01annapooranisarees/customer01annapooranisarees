const { getConfig } = require('@customer01annapooranisarees/annapoorani/src/lib/util/getConfig');

module.exports.getAdminSessionCookieName = () =>
  getConfig('system.session.adminCookieName', 'asid');
