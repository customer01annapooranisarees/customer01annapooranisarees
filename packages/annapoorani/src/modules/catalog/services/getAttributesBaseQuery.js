const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getAttributesBaseQuery = () => select().from('attribute');
