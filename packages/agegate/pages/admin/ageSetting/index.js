const { setContextValue } = require("@customer01annapooranisarees/customer01annapooranisarees/src/modules/graphql/services/contextHelper");

module.exports = (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Age Setting',
    description: 'Age Setting'
  });
};
