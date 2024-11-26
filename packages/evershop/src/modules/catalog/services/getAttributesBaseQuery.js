const { select } = require('@annapoorani/postgres-query-builder');

module.exports.getAttributesBaseQuery = () => select().from('attribute');
