const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports.getCookieSecret = () => getConfig('system.session.cookieSecret', 'keyboard cat');
