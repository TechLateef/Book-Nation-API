const CustomError = require("./custormError");
const { StatusCodes } = require("http-status-codes");
class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
