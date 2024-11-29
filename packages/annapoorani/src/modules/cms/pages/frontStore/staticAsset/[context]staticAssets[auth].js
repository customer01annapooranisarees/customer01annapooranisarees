const staticMiddleware = require('@customer01annapooranisarees/annapoorani/src/lib/middlewares/static');

module.exports = (request, response, delegate, next) => {
  staticMiddleware(request, response, next);
};
