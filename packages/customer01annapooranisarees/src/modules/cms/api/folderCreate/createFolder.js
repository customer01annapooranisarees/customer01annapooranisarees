const { basename } = require('path');
const { OK } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/httpStatus');
const { createFolder } = require('../../services/createFolder');
// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const { path } = request.body || '';
  await createFolder(path);
  response.status(OK).json({
    data: {
      path,
      name: basename(path)
    }
  });
};
