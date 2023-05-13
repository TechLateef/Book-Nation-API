const express = require("express");

const app = express();

//Register all Middleware
require("./middlewares")(app);

//Register Routers
require("./routes")(app);

//Register handler
require("./errors/GlobalHandler")(app);
module.exports = app;
