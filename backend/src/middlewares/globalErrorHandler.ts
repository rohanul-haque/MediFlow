/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Type
 */
import type { NextFunction, Request, Response } from "express";

/**
 * Global Error Handler Middleware
 */
const globalErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(error);

  /**
   * JWT Invalid Token Error
   */
  if (error instanceof JsonWebTokenError) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,

      code: ERROR_CODE.AUTHENTICATION_ERROR,

      message: "Invalid token",
    });

    return;
  }

  /**
   * JWT Expired Token Error
   */
  if (error instanceof TokenExpiredError) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,

      code: ERROR_CODE.AUTHENTICATION_ERROR,

      message: "Token expired",
    });

    return;
  }

  /**
   * Custom Error
   */
  const err = error as {
    statusCode?: number;
    status?: number;
    code?: string;
    message?: string;
    stack?: string;
  };

  const statusCode =
    err.statusCode || err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,

    code: err.code || ERROR_CODE.INTERNAL_SERVER_ERROR,

    message,

    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};

export default globalErrorHandler;
