const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');
const { OK } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const coupon = await delegate.createCoupon;
  response.status(OK);
  response.json({
    data: {
      ...coupon,
      links: [
        {
          rel: 'couponGrid',
          href: buildUrl('couponGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('couponEdit', { id: coupon.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
