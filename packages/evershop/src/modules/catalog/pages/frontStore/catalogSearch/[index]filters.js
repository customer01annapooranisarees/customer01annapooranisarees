const {
  buildFilterFromUrl
} = require('@annapoorani/annapoorani/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('@annapoorani/annapoorani/src/modules/graphql/services/contextHelper');

module.exports = (request, response, delegate, next) => {
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
  next();
};
