const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');
const {
  translate
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/locale/translate/translate');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = (request, response, delegate, next) => {
  // Check if the user is logged in
  if (request.isCustomerLoggedIn()) {
    // Redirect to homepage
    response.redirect(buildUrl('homepage'));
  } else {
    setContextValue(request, 'pageInfo', {
      title: translate('Login'),
      description: translate('Login')
    });
    next();
  }
};
