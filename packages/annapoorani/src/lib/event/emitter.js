const { insert } = require('@customer01annapooranisarees/postgres-query-builder');
const { pool } = require('@customer01annapooranisarees/annapoorani/src/lib/postgres/connection');

module.exports.emit = async function emit(name, data) {
  await insert('event')
    .given({
      name,
      data
    })
    .execute(pool);
};
