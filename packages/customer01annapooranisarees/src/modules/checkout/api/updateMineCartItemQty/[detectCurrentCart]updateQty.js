const {
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR,
  OK
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/httpStatus');
const {
  translate
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/locale/translate/translate');
const { error } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/log/logger');
const { getCartByUUID } = require('../../services/getCartByUUID');
const { saveCart } = require('../../services/saveCart');
const { getContextValue } = require('../../../graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const { item_id } = request.params;
    const cartId = getContextValue(request, 'cartId');
    const cart = await getCartByUUID(cartId);
    if (!cart) {
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          message: translate('Invalid cart'),
          status: INVALID_PAYLOAD
        }
      });
      return;
    }
    const { action, qty } = request.body;
    const item = await cart.updateItemQty(item_id, qty, action);
    await saveCart(cart);
    response.status(OK);
    response.$body = {
      data: {
        item: item.export(),
        count: cart.getItems().length,
        cartId: cart.getData('uuid')
      }
    };
    next();
  } catch (err) {
    error(err);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: err.message
      }
    });
  }
};
