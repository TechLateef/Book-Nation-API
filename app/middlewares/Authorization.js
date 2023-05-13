const UnAuthorized = require("../errors/UnAuthorize");
const User = require("../models/User.model");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.AuthenticationMiddleware = catchAsync(async (req, res, next) => {
  // If user is already authenticated
  if (req.user?._id) return next();
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (res.cookies?.jwt) {
    token = res.cookies.jwt;
  }
  if (!token) {
    return next(
      new UnAuthorized("oop you are not logged in, please login to gain access")
    );
  }
  try {
    const decode = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const { userId, iat } = decode;
    const user = await User.findById(userId);
    if (!user) {
      return next(
        new UnAuthorized("User with this credential no longer exist")
      );
    }
    req.user = user;
    next();
  } catch (ex) {
    throw ex;
  }
});
