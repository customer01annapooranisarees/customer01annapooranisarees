const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports.getAttributeGroupsBaseQuery = () => select().from('attribute_group');
