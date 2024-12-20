const { merge } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/merge');
const { addProcessor } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/registry');

module.exports = () => {
  addProcessor('configuratonSchema', (schema) => {
    merge(
      schema,
      {
        properties: {
          google_login: {
            type: 'object',
            properties: {
              client_id: {
                type: 'string'
              },
              client_secret: {
                type: 'string'
              },
              success_redirect_url: {
                type: 'string',
                format: 'uri'
              },
              failure_redirect_url: {
                type: 'string',
                format: 'uri'
              }
            }
          }
        }
      },
      100
    );
    return schema;
  });
};
