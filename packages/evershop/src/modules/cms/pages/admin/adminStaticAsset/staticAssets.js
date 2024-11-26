const staticMiddleware = require('@annapoorani/annapoorani/src/lib/middlewares/static');

module.exports = (request, response, stack, next) => {
  staticMiddleware(request, response, next);
};
