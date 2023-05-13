const { BadRequest } = require("../errors");
const AuthRouter = require("./Auth.route");

/**
 *
 * @param {Express} app express app
 */
const routeRegister = (app) => {
  app.get("/", (req, res) => {
    res.send("Application is running");
  });

  app.use("/api/v1/auth", AuthRouter);
};

module.exports = routeRegister;
