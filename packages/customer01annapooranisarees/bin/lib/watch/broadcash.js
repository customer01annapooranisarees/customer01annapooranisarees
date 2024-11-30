const { getRoutes } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/Router');

module.exports.broadcash = function broadcash() {
  const routes = getRoutes();
  routes.forEach((route) => {
    if (
      !route.isApi &&
      !['staticAsset', 'adminStaticAsset'].includes(route.id)
    ) {
      const { hotMiddleware } = route;
      if (hotMiddleware) {
        hotMiddleware.publish({
          action: 'serverReloaded'
        });
      }
    }
  });
};
