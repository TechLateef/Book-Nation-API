const { BadRequest } = require("../errors");
const AuthRouter = require("./Auth.route");
const { graphqlHTTP } = require("express-graphql");
const graphqlResolver = require("../graphql/resolver/index");
const graphqlSchema = require("../graphql/schema/index");

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
};

module.exports = routeRegister;
