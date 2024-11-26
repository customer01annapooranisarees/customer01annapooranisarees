const { setContextValue } = require("@annapoorani/annapoorani/src/modules/graphql/services/contextHelper");

module.exports = (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Age Setting',
    description: 'Age Setting'
  });
};
