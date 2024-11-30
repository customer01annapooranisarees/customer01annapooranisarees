const chokidar = require('chokidar');
const { resolve } = require('path');
const { CONSTANTS } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/helpers');
const { existsSync } = require('fs');
const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

function watch(calbacks = []) {
  const watcher = chokidar.watch(resolve(CONSTANTS.ROOTPATH, 'extensions/**'), {
    // ignored: /node_modules[\\/]/,
    ignoreInitial: true,
    persistent: true
  });

  if (existsSync(resolve(CONSTANTS.ROOTPATH, 'packages'))) {
    watcher.add(resolve(CONSTANTS.ROOTPATH, 'packages/customer01annapooranisarees/src/**'));
  }

  // Watch themes folder
  const theme = getConfig('system.theme');
  if (theme && existsSync(resolve(CONSTANTS.ROOTPATH, 'themes', theme))) {
    watcher.add(resolve(CONSTANTS.ROOTPATH, 'themes', theme, '**'));
  }

  watcher.on('all', (event, path) => {
    calbacks.forEach((callback) => {
      callback(event, path);
    });
  });
}

module.exports.watch = watch;
