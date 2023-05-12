const { StatusCodes } = require("http-status-codes");
const { ServerError } = require("../errors");
const User = require("../models/User.model");
const catchAsync = require("../utils/catchAsync");
const { createAndSendToken } = require("../services/User.service");

const CreateUser = catchAsync(async (req, res) => {
  const user = await User.create({ ...req.body });

  if (!user) {
    throw new ServerError("Unable to create User");
  }
  createAndSendToken(user, StatusCodes.OK, "User created", res);
});

module.exports = {
  CreateUser,
};
