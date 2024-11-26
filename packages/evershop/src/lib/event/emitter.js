const { insert } = require('@annapoorani/postgres-query-builder');
const { pool } = require('@annapoorani/annapoorani/src/lib/postgres/connection');

module.exports.emit = async function emit(name, data) {
  await insert('event')
    .given({
      name,
      data
    })
    .execute(pool);
};
