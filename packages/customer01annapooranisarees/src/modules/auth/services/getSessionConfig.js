const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');
const sessionStorage = require('connect-pg-simple');
const session = require('express-session');

module.exports.getSessionConfig = (cookieSecret) => {
  const sess = {
    store: new (sessionStorage(session))({
      pool
    }),
    secret: cookieSecret,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    resave: getConfig('system.session.resave', false),
    saveUninitialized: getConfig('system.session.saveUninitialized', false)
  };

  return sess;
};
