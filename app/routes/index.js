const { BadRequest } = require("../errors");
const AuthRouter = require("./Auth.route");
const { graphqlHTTP } = require("express-graphql");
const graphqlResolver = require("../graphql/resolver/index");
const graphqlSchema = require("../graphql/schema/index");
const storeRouter = require("./Store.route");
const uploadRoute = require("./upload.route");

/**
 *
 * @param {Express} app express app
 */
const routeRegister = (app) => {
  app.get("/", (req, res) => {
    res.send("Application is running");
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
    })
  );

  app.use("/api/v1/auth", AuthRouter);
  app.use("api/v1/upload", uploadRoute);
  app.use("api/v1/store", storeRouter);
};

module.exports = routeRegister;
