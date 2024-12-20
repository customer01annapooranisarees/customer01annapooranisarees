const { OK } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/httpStatus');
const { deleteFile } = require('../../services/deleteFile');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const path = request.params[0] || '';
  await deleteFile(path);
  response.status(OK).json({
    data: {
      path
    }
  });
};
