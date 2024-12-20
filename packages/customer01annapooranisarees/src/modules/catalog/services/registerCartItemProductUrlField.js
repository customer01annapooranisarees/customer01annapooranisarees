const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const { buildUrl } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/router/buildUrl');
const { select } = require('@customer01annapooranisarees/postgres-query-builder');

module.exports = exports = {};

exports.registerCartItemProductUrlField = (fields) => {
  const newFields = fields.concat([
    {
      key: 'productUrl',
      resolvers: [
        async function resolver() {
          const product = await this.getProduct();
          if (!this.getData('product_id')) {
            return null;
          }
          const urlRewrite = await select()
            .from('url_rewrite')
            .where('entity_uuid', '=', product.uuid)
            .and('entity_type', '=', 'product')
            .load(pool);
          if (!urlRewrite) {
            return buildUrl('productView', {
              uuid: product.uuid
            });
          } else {
            return urlRewrite.request_path;
          }
        }
      ],
      dependencies: ['product_id']
    }
  ]);
  return newFields;
};
