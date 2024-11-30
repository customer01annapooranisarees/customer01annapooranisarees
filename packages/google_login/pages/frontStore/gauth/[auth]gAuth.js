const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');
const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');
const {
  getGoogleAuthUrl
} = require('@customer01annapooranisarees/google_login/services/getGoogleAuthUrl');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response, delegate, next) => {
  // Check if customer is already logged in
  if (request.isCustomerLoggedIn()) {
    response.redirect('/');
    return;
  }
  const client_id = getConfig('google_login.client_id');
  const homeUrl = getConfig('shop.homeUrl', 'http://localhost:3000');
  const redirect_uri = `${homeUrl}${buildUrl('gcallback')}`;
  const googleAuthUrl = getGoogleAuthUrl(client_id, redirect_uri);
  response.redirect(googleAuthUrl);
};
