const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const { urlencoded, json, raw, static } = require("express");
const bodyParser = require("body-parser");
/**
 * Register all middlware
 * @param {Express} app express app
 */
const midddlewareRegister = (app) => {
  //cross origin source
  app.use(cors());
  app.use(cookieParser());

  app.use(xss());
  app.use(urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

module.exports = midddlewareRegister;
