const { select } = require('@customer01annapooranisarees/postgres-query-builder');
const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('customer');
    query.andWhere('customer.uuid', '=', request.params.id);
    const customer = await query.load(pool);

    if (customer === null) {
      response.status(404);
      next();
    } else {
      setContextValue(request, 'customerId', customer.customer_id);
      setContextValue(request, 'customerUuid', customer.uuid);
      setContextValue(request, 'pageInfo', {
        title: customer.full_name,
        description: customer.full_name
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
