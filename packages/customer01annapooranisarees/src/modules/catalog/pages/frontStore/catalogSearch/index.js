const {
  translate
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/locale/translate/translate');
const { get } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/get');
const {
  setContextValue
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/modules/graphql/services/contextHelper');

module.exports = (request, response, delegate, next) => {
  // Get the keyword from the request query
  const keyword = get(request, 'query.keyword');
  if (!keyword) {
    // Redirect to the home page if no keyword is not provided
    response.redirect('/');
  } else {
    setContextValue(request, 'pageInfo', {
      title: translate('Search results for: ${keyword}', { keyword }),
      description: translate('Search results for: ${keyword}', { keyword }),
      url: request.url
    });
    next();
  }
};
