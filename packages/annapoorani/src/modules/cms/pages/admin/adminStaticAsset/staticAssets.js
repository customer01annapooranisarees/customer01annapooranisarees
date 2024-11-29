const staticMiddleware = require('@customer01annapooranisarees/annapoorani/src/lib/middlewares/static');

module.exports = (request, response, stack, next) => {
  staticMiddleware(request, response, next);
};
