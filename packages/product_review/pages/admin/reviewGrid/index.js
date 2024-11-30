const {
  buildFilterFromUrl
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/modules/graphql/services/contextHelper');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Reviews',
    description: 'Reviews'
  });
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
};
