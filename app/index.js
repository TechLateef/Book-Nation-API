const express = require("express");

const app = express();

//Register all Middleware
require("./middlewares")(app);

//Register Routers
require("./routes")(app);

module.exports = app;
