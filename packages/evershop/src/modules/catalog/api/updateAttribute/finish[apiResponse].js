const { buildUrl } = require('@annapoorani/annapoorani/src/lib/router/buildUrl');
const { OK } = require('@annapoorani/annapoorani/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const attribute = await delegate.updateAttribute;
  response.status(OK);
  response.json({
    data: {
      ...attribute,
      links: [
        {
          rel: 'attributeGrid',
          href: buildUrl('attributeGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('attributeEdit', { id: attribute.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
