const { getConfig } = require('@annapoorani/annapoorani/src/lib/util/getConfig');

module.exports.getCookieSecret = () => getConfig('system.session.cookieSecret', 'keyboard cat');
