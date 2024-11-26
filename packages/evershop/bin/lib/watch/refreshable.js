const chokidar = require('chokidar');
const { resolve } = require('path');
const { CONSTANTS } = require('@annapoorani/annapoorani/src/lib/helpers');
const { broadcash } = require('./broadcash');

function refreshable() {
  const watcher = chokidar.watch('./packages/annapoorani/src/lib/response/*', {
    ignored: /node_modules[\\/]/,
    ignoreInitial: true,
    persistent: true
  });
  watcher.add('./packages/annapoorani/src/lib/util/*');
  watcher.on('all', (event, path) => {
    delete require.cache[require.resolve(resolve(CONSTANTS.ROOTPATH, path))];
    broadcash();
  });
}

module.exports.refreshable = refreshable;
