const webpack = require('webpack');
const {
  createConfigClient
} = require('@customer01annapooranisarees/annapoorani/src/lib/webpack/prod/createConfigClient');
const { error } = require('@customer01annapooranisarees/annapoorani/src/lib/log/logger');

module.exports.buildClient = async function buildClient(routes) {
  const config = createConfigClient(routes);
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