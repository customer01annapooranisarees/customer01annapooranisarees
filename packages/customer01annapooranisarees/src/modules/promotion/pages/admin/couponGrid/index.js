const {
  buildFilterFromUrl
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Coupons',
    description: 'Coupons'
  });
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
};
