const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');
const { OK } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const widget = await delegate.updateWidget;
  response.status(OK);
  response.json({
    data: {
      ...widget,
      links: [
        {
          rel: 'widgetGrid',
          href: buildUrl('widgetGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('widgetEdit', { id: widget.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
