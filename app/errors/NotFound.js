const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custormError");

class NotFound extends CustomError {
  constructor(
    name,
    statusCode = StatusCodes.NOT_FOUND,
    isOperational = true,
    message = "Not Found"
  ) {
    super(name, statusCode, isOperational, message);
  }
}

module.exports = NotFound;
