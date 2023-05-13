const errorHandler = require("../middlewares/ErrorHandler");

/**
 * register all global handler at end of the middleware
 * @param {Express} app express app
 */
const globalHandlersRegister = (app) => {
  app.use(errorHandler);
};

module.exports = globalHandlersRegister;
