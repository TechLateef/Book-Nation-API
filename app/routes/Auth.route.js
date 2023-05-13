const express = require("express");
const { CreateUser, logIn, logOut } = require("../controllers/Auth.controller");
const { AuthenticationMiddleware } = require("../middlewares/Authorization");

const AuthRouter = express.Router();

AuthRouter.post("/SigIn", CreateUser);

AuthRouter.route("/login", AuthenticationMiddleware).post(logIn);

AuthRouter.post("/logout", logOut);

module.exports = AuthRouter;
