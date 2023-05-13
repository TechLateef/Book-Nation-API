const CustomError = require("./custormError");
const { StatusCodes } = require("http-status-codes");
class BadRequest extends CustomError {
  constructor(
    name,
    statusCode = StatusCodes.BAD_REQUEST,
    isOperational = true,
    message = "Bad Request"
  ) {
    super(name, statusCode, isOperational, message);
  }
}

module.exports = BadRequest;
