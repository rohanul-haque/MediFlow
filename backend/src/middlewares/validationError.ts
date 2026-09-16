/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { validationResult } from "express-validator";

/**
 * Type
 */
import type { NextFunction, Request, Response } from "express";

/**
 * Express Validation Error Middleware
 */
const validationError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ code: "VALIDATION_ERROR", errors: errors.mapped() });

    return;
  }

  next();
};

export default validationError;
