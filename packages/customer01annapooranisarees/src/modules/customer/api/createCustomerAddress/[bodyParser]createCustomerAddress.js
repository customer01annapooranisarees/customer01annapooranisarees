const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/httpStatus');
const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');
const { error } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/log/logger');
const createCustomerAddress = require('../../services/customer/address/createCustomerAddress');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    const address = await createCustomerAddress(
      request.params.customer_id,
      request.body
    );
    // eslint-disable-next-line no-param-reassign
    delegate.createCustomerAddress = address;
    response.status(OK);
    response.$body = {
      data: {
        ...address,
        links: [
          {
            rel: 'edit',
            href: buildUrl('updateCustomerAddress', {
              address_id: address.uuid,
              customer_id: request.params.customer_id
            }),
            action: 'UPDATE',
            types: ['application/json']
          },
          {
            rel: 'delete',
            href: buildUrl('deleteCustomerAddress', {
              address_id: address.uuid,
              customer_id: request.params.customer_id
            }),
            action: 'DELETE',
            types: ['application/json']
          }
        ]
      }
    };
    next();
  } catch (e) {
    error(e);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
