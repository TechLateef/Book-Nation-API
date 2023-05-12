const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custormError");

class ServerError extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
