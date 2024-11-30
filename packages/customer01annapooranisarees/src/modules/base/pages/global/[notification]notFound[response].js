const {
  translate
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/locale/translate/translate');
const { setContextValue } = require('../../../graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  if (response.statusCode !== 404) {
    next();
  } else {
    setContextValue(request, 'pageInfo', {
      title: translate('Not found'),
      description: translate('Page not found')
    });
    next();
  }
};
