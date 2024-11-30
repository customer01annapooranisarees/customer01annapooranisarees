/* eslint-disable camelcase */
const {
  rollback,
  insert,
  commit,
  startTransaction
} = require('@customer01annapooranisarees/postgres-query-builder');
const {
  getConnection
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, deledate, next) => {
  const connection = await getConnection();
  await startTransaction(connection);
  const { name } = request.body;
  try {
    const taxClass = await insert('tax_class')
      .given({
        name
      })
      .execute(connection);
    await commit(connection);
    response.status(OK);
    response.json({
      data: taxClass
    });
  } catch (e) {
    await rollback(connection);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
