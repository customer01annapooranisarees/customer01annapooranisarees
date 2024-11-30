const staticMiddleware = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/middlewares/static');

module.exports = (request, response, stack, next) => {
  staticMiddleware(request, response, next);
};
