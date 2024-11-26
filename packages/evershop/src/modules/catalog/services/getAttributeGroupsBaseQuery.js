const { select } = require('@annapoorani/postgres-query-builder');

module.exports.getAttributeGroupsBaseQuery = () => select().from('attribute_group');
