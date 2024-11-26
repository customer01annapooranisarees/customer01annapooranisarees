const { addProcessor } = require('@annapoorani/annapoorani/src/lib/util/registry');
const {
  defaultPaginationFilters
} = require('@annapoorani/annapoorani/src/lib/util/defaultPaginationFilters');
const registerDefaultReviewCollectionFilters = require('./services/registerDefaultReviewCollectionFilters');

module.exports = () => {
  // Reigtering the default filters for attribute collection
  addProcessor(
    'productReviewCollectionFilters',
    registerDefaultReviewCollectionFilters,
    1
  );
  addProcessor(
    'productReviewCollectionFilters',
    (filters) => [...filters, ...defaultPaginationFilters],
    2
  );
};
