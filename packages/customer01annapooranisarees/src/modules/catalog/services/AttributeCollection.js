const { camelCase } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/camelCase');
const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const { getValue } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/registry');

class AttributeCollection {
  constructor(baseQuery) {
    this.baseQuery = baseQuery;
  }

  async init(filters = []) {
    const currentFilters = [];

    // Apply the filters
    const attributeCollectionFilters = await getValue(
      'attributeCollectionFilters',
      []
    );

    attributeCollectionFilters.forEach((filter) => {
      const check = filters.find(
        (f) => f.key === filter.key && filter.operation.includes(f.operation)
      );
      if (filter.key === '*' || check) {
        filter.callback(
          this.baseQuery,
          check?.operation,
          check?.value,
          currentFilters
        );
      }
    });

    // Clone the main query for getting total right before doing the paging
    const totalQuery = this.baseQuery.clone();
    totalQuery.select('COUNT(attribute.attribute_id)', 'total');
    totalQuery.removeOrderBy();
    totalQuery.removeLimit();

    this.currentFilters = currentFilters;
    this.totalQuery = totalQuery;
  }

  async items() {
    const items = await this.baseQuery.execute(pool);
    return items.map((row) => camelCase(row));
  }

  async total() {
    // Call items to get the total
    const total = await this.totalQuery.execute(pool);
    return total[0].total;
  }

  currentFilters() {
    return this.currentFilters;
  }
}

module.exports.AttributeCollection = AttributeCollection;
