const { StatusCodes } = require("http-status-codes");
const { FALLBACK_MESSAGES } = require("./constants");

exports.jsonResponse = (code, data, res, message = "") => {
  const resp = {
    code,
    status: getStatus(code),
    message: getStatusMessage(code, message),
    ...data,
  };
  res.status(code).json(resp);
};

const getStatus = (code) => {
  try {
    switch (code) {
      case StatusCodes.CREATED:
      case StatusCodes.OK:
        return "success";
      case StatusCodes.ACCEPTED:
        return "accepted";
      case StatusCodes.SERVICE_UNAVAILABLE:
      case StatusCodes.BAD_REQUEST:
      case StatusCodes.NOT_FOUND:
      case StatusCodes.UNAUTHORIZED:
      case StatusCodes.FORBIDDEN:
      case StatusCodes.REQUEST_TIMEOUT:
      case StatusCodes.INTERNAL_SERVER_ERROR:
      case StatusCodes.UNPROCESSABLE_ENTITY:
        return "error";
      default:
        return "error";
    }
  } catch (error) {
    return error.message;
  }
};

const getStatusMessage = (code, extraInfo) => {
  try {
    switch (code) {
      case StatusCodes.CREATED:
      case StatusCodes.OK:
        return extraInfo.trim() || FALLBACK_MESSAGES.RequestOk;
      case StatusCodes.ACCEPTED:
        return extraInfo.trim() || FALLBACK_MESSAGES.RequestAccepted;
      case StatusCodes.SERVICE_UNAVAILABLE:
        return extraInfo.trim() || FALLBACK_MESSAGES.ServiceUnavailableMsg;
      case StatusCodes.BAD_REQUEST:
        return extraInfo.trim() || FALLBACK_MESSAGES.BadRequestMsg;
      case StatusCodes.UNAUTHORIZED:
        return extraInfo.trim() || FALLBACK_MESSAGES.UnauthorizedMsg;
      case StatusCodes.FORBIDDEN:
        return extraInfo.trim() || FALLBACK_MESSAGES.ForbiddenMsg;
      case StatusCodes.NOT_FOUND:
        return extraInfo.trim() || FALLBACK_MESSAGES.NotFoundMsg;
      case StatusCodes.REQUEST_TIMEOUT:
        return extraInfo.trim() || FALLBACK_MESSAGES.TimeOutMsg;
      case StatusCodes.INTERNAL_SERVER_ERROR:
        return extraInfo.trim() || FALLBACK_MESSAGES.InternalServerErrorMsg;
      case StatusCodes.UNPROCESSABLE_ENTITY:
        return extraInfo.trim() || FALLBACK_MESSAGES.UnprocessableEntityMsg;
      default:
        return extraInfo.trim() || FALLBACK_MESSAGES.UnprocessableEntityMsg;
    }
  } catch (error) {
    return error.message;
  }
};
