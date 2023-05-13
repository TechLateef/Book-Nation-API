const { StatusCodes } = require("http-status-codes");
const { ServerError, BadRequest } = require("../errors");
const User = require("../models/User.model");
const catchAsync = require("../utils/catchAsync");
const { createAndSendToken } = require("../services/User.service");
const { jsonResponse } = require("../utils/responseHelper");
const UnAuthorized = require("../errors/UnAuthorize");

/**
 *
 * @param {String} Model -Model to be use to create new User
 * @returns {Object}
 */
const CreateUser = (Model) =>
  catchAsync(async (req, res) => {
    const user = await Model.create({ ...req.body });

    if (!user) {
      throw new ServerError("Unable to create User");
    }
    createAndSendToken(user, StatusCodes.OK, "User created", res);
  });

const logIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    jsonResponse(StatusCodes.BAD_REQUEST, {}, res);
  }
  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new UnAuthorized("Invalid Credentials");
  }

  const isPassword = await isUser.comparePassword(password);
  if (!isPassword) {
    throw new UnAuthorized("Invalid Credentials");
  }
  createAndSendToken(isUser, 200, "login successful", res);
});

const logOut = catchAsync(async (req, res) => {
  res.cookie("jwt", "logged out", { maxAge: 1000, httpOnly: true });
  res.jsonResponse(200, {}, res, "Logged out successful");
});

module.exports = {
  CreateUser,
  logIn,
  logOut,
};
