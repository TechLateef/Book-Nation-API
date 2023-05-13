const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const { urlebcoded, json, raw, static, urlencoded } = require("express");

/**
 * Register all middlware
 * @param {Express} app express app
 */
const midddlewareRegister = (app) => {
  //cross origin source
  app.use(cors());
  app.use(cookieParser());
  app.use(helmet());
  app.use(xss());
  app.use(urlencoded({ extended: true }));
};

module.exports = midddlewareRegister;
