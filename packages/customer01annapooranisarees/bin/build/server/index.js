const webpack = require('webpack');
const {
  createConfigServer
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/webpack/prod/createConfigServer');
const { error } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/log/logger');

module.exports.buildServer = async function buildServer(routes) {
  const config = createConfigServer(routes);
  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        error(
          stats.toString({
            errorDetails: true,
            warnings: true
          })
        );
        reject(err);
      }
      resolve(stats);
    });
  });
};
