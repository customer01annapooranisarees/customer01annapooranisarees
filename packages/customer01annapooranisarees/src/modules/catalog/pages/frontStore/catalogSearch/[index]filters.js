const {
  buildFilterFromUrl
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/modules/graphql/services/contextHelper');

module.exports = (request, response, delegate, next) => {
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
  next();
};
