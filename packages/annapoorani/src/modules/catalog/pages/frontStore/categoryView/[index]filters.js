const {
  buildFilterFromUrl
} = require('@customer01annapooranisarees/annapoorani/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
  next();
};
