const { GraphQLJSON } = require('graphql-type-json');
const { buildUrl } = require('@annapoorani/annapoorani/src/lib/router/buildUrl');
const { camelCase } = require('@annapoorani/annapoorani/src/lib/util/camelCase');
const {
  getCouponsBaseQuery
} = require('../../../services/getCouponsBaseQuery');
const { CouponCollection } = require('../../../services/CouponCollection');

module.exports = {
  JSON: GraphQLJSON,
  Query: {
    coupon: async (root, { id }, { pool }) => {
      const query = getCouponsBaseQuery();
      query.where('coupon_id', '=', id);
      const coupon = await query.load(pool);
      return coupon ? camelCase(coupon) : null;
    },
    coupons: async (_, { filters = [] }, { user }) => {
      // This field is for admin only
      if (!user) {
        return [];
      }
      const query = getCouponsBaseQuery();
      const root = new CouponCollection(query);
      await root.init(filters);
      return root;
    }
  },
  Coupon: {
    targetProducts: ({ targetProducts }) => {
      if (!targetProducts) {
        return null;
      } else {
        return camelCase(targetProducts);
      }
    },
    condition: ({ condition }) => {
      if (!condition) {
        return null;
      } else {
        return camelCase(condition);
      }
    },
    userCondition: ({ userCondition }) => {
      if (!userCondition) {
        return null;
      } else {
        return camelCase(userCondition);
      }
    },
    buyxGety: ({ buyxGety }) => {
      if (!buyxGety) {
        return [];
      } else {
        return buyxGety.map((item) => camelCase(item));
      }
    },
    editUrl: ({ uuid }) => buildUrl('couponEdit', { id: uuid }),
    updateApi: (coupon) => buildUrl('updateCoupon', { id: coupon.uuid }),
    deleteApi: (coupon) => buildUrl('deleteCoupon', { id: coupon.uuid })
  }
};
