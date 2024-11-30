const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports.getAdminSessionCookieName = () =>
  getConfig('system.session.adminCookieName', 'asid');
