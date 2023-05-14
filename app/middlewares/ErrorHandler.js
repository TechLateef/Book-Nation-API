const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Oops, something went wrong",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join("\n");
    customError.statusCode = 400;
  } else if (err.code === 11000) {
    customError.msg = "Email Already Taken";
    customError.statusCode = 400;
  } else if ((err.name = "CastError")) {
    customError.msg = "Not Found";
    customError.statusCode = 404;
    console.log(err);
  }
  const response = {
    msg: customError.msg,
  };

  if (process.env.NODE_ENV === "developer") {
    response.err = err;
    response.stack = err.stack;
  }

  return res.status(customError.statusCode).json(response);
};

module.exports = errorHandler;
