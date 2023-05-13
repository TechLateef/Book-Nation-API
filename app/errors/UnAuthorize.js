const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custormError");

class UnAuthorized extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthorized;
