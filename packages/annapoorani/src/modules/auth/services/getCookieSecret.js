const { getConfig } = require('@customer01annapooranisarees/annapoorani/src/lib/util/getConfig');

module.exports.getCookieSecret = () => getConfig('system.session.cookieSecret', 'keyboard cat');
