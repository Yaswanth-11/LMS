import logger from "../utils/logger.js";
import { ErrorService } from "../dto/errorDto.js";

const errorHandler = (err, req, res, next) => {
  // Log the error using your custom ErrorService
  new ErrorService(
    req.path, // Use the request path as the functionName
    "An unhandled error occurred",
    err
  ).logError();

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

export default errorHandler;
