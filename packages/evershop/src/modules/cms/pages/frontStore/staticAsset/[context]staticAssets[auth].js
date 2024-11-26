const staticMiddleware = require('@annapoorani/annapoorani/src/lib/middlewares/static');

module.exports = (request, response, delegate, next) => {
  staticMiddleware(request, response, next);
};
