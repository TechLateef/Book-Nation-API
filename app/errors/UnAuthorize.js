const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custormError");

class UnAuthorized extends CustomError {
  constructor(
    name,
    statusCode = StatusCodes.UNAUTHORIZED,
    isOperational = true,
    message = "you are not UnAuthorize"
  ) {
    super(name, statusCode, isOperational, message);
  }
}

module.exports = UnAuthorized;
