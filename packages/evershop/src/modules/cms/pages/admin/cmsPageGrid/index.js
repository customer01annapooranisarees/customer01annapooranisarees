const {
  buildFilterFromUrl
} = require('@annapoorani/annapoorani/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Cms pages',
    description: 'Cms pages'
  });
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
};