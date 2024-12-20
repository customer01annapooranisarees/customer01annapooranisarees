const http = require('http');
const config = require('config');
const { Handler } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/middleware/Handler');
const spawn = require('cross-spawn');
const path = require('path');
const { error } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/log/logger');
const isDevelopmentMode = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/isDevelopmentMode');
const { lockHooks } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/hookable');
const { lockRegistry } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/registry');
const {
  validateConfiguration
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/validateConfiguration');
const { createApp } = require('./app');
const normalizePort = require('./normalizePort');
const onListening = require('./onListening');
const onError = require('./onError');
const { getCoreModules } = require('./loadModules');
const { migrate } = require('./bootstrap/migrate');
const { loadBootstrapScript } = require('./bootstrap/bootstrap');
const { getEnabledExtensions } = require('../extension');

let app = createApp();
/** Create a http server */
const server = http.createServer(app);

module.exports.start = async function start(cb) {
  const modules = [...getCoreModules(), ...getEnabledExtensions()];

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

  /** Migration */
  try {
    await migrate(modules);
  } catch (e) {
    error(e);
    process.exit(0);
  }

  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort();
  app.set('port', port);

  /** Start listening */
  server.on('listening', () => {
    onListening();
    if (cb) {
      cb();
    }
  });
  server.on('error', onError);
  server.listen(port);

  // Spawn the child process to manage events
  const args = [
    path.resolve(__dirname, '../../src/lib/event/event-manager.js')
  ];
  if (isDevelopmentMode() || process.argv.includes('--debug')) {
    args.push('--debug');
  }
  const child = spawn('node', args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      ALLOW_CONFIG_MUTATIONS: true
    }
  });

  child.on('error', (err) => {
    error(`Error spawning event processor: ${err}`);
  });

  child.unref();

  // Spawn the child process to manage scheduled jobs
  const jobArgs = [path.resolve(__dirname, 'cronjob.js')];
  if (isDevelopmentMode() || process.argv.includes('--debug')) {
    jobArgs.push('--debug');
  }
  const jobChild = spawn('node', jobArgs, {
    stdio: 'inherit',
    env: {
      ...process.env,
      ALLOW_CONFIG_MUTATIONS: true
    }
  });
  jobChild.on('error', (err) => {
    error(`Error spawning job processor: ${err}`);
  });
  jobChild.unref();
};

module.exports.updateApp = function updateApp(cb) {
  /** Clean up middleware */
  Handler.middlewares = [];
  const newApp = createApp();
  server.removeListener('request', app);
  server.on('request', newApp);
  app = newApp;
  cb();
};
