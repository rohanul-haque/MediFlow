/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Module
 */
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Not Found Error Handler Middleware
 * @param req
 * @param res
 */
const notFoundRoute = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    code: ERROR_CODE.NOT_FOUND,
    message: `Route ${req.originalUrl} not found`,
  });
};

export default notFoundRoute;
