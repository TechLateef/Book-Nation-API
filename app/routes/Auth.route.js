const express = require("express");
const { CreateUser, logIn, logOut } = require("../controllers/Auth.controller");
const { AuthenticationMiddleware } = require("../middlewares/Authorization");
const User = require("../models/User.model");

const AuthRouter = express.Router();

AuthRouter.post("/signup", CreateUser(User));

AuthRouter.route("/login", AuthenticationMiddleware).post(logIn);

AuthRouter.post("/logout", logOut);

module.exports = AuthRouter;
