process.env.ALLOW_CONFIG_MUTATIONS = true;
const config = require('config');
const { existsSync, rmSync, mkdirSync } = require('fs');
const path = require('path');
const { CONSTANTS } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/helpers');
const {
  loadModuleRoutes
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/loadModuleRoutes');
const { getRoutes } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/Router');
const {
  isBuildRequired
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/webpack/isBuildRequired');
const { buildEntry } = require('@customer01annapooranisarees/customer01annapooranisarees/bin/lib/buildEntry');
const { getCoreModules } = require('@customer01annapooranisarees/customer01annapooranisarees/bin/lib/loadModules');
const { error } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/log/logger');
const { lockHooks } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/hookable');
const { lockRegistry } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/registry');
const {
  validateConfiguration
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/validateConfiguration');
const { compile } = require('./complie');
const { getEnabledExtensions } = require('../extension');
const { loadBootstrapScript } = require('../lib/bootstrap/bootstrap');
require('dotenv').config();
/* Loading modules and initilize routes, components */
const modules = [...getCoreModules(), ...getEnabledExtensions()];

/** Loading routes  */
modules.forEach((module) => {
  try {
    // Load routes
    loadModuleRoutes(module.path);
  } catch (e) {
    error(e);
    process.exit(0);
  }
});

/** Clean up the build directory */
if (existsSync(path.resolve(CONSTANTS.BUILDPATH))) {
  // Delete directory recursively
  rmSync(path.resolve(CONSTANTS.BUILDPATH), { recursive: true });
  mkdirSync(path.resolve(CONSTANTS.BUILDPATH));
} else {
  mkdirSync(path.resolve(CONSTANTS.BUILDPATH), { recursive: true });
}

(async () => {
  /** Loading bootstrap script from modules */
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const module of modules) {
      await loadBootstrapScript(module);
    }
    lockHooks();
    lockRegistry();
    // Get the configuration (nodeconfig)
    validateConfiguration(config);
  } catch (e) {
    error(e);
    process.exit(0);
  }
  process.env.ALLOW_CONFIG_MUTATIONS = false;

  const routes = getRoutes();
  await buildEntry(routes.filter((r) => isBuildRequired(r)));

  /** Build  */
  await compile(routes);
})();
