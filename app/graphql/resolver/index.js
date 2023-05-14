const orderResolver = require("./Order.resolver");

const rootResolver = {
  ...orderResolver,
};

module.exports = rootResolver;
