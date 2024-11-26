process.env.ALLOW_CONFIG_MUTATIONS = true;
const config = require('config');
const { existsSync, rmSync, mkdirSync } = require('fs');
const path = require('path');
const { CONSTANTS } = require('@annapoorani/annapoorani/src/lib/helpers');
const {
  loadModuleRoutes
} = require('@annapoorani/annapoorani/src/lib/router/loadModuleRoutes');
const { getRoutes } = require('@annapoorani/annapoorani/src/lib/router/Router');
const {
  isBuildRequired
} = require('@annapoorani/annapoorani/src/lib/webpack/isBuildRequired');
const { buildEntry } = require('@annapoorani/annapoorani/bin/lib/buildEntry');
const { getCoreModules } = require('@annapoorani/annapoorani/bin/lib/loadModules');
const { error } = require('@annapoorani/annapoorani/src/lib/log/logger');
const { lockHooks } = require('@annapoorani/annapoorani/src/lib/util/hookable');
const { lockRegistry } = require('@annapoorani/annapoorani/src/lib/util/registry');
const {
  validateConfiguration
} = require('@annapoorani/annapoorani/src/lib/util/validateConfiguration');
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
