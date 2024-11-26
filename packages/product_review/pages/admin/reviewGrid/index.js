const {
  buildFilterFromUrl
} = require('@annapoorani/annapoorani/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('@annapoorani/annapoorani/src/modules/graphql/services/contextHelper');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Reviews',
    description: 'Reviews'
  });
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
};
