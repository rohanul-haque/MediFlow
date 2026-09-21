/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import User from "@/models/User";
import AppError from "@/utils/appError";
import asyncHandler from "@/utils/asyncHandler";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Types
 */
import type { AuthRole } from "@/types/common.type";
import type { NextFunction, Request, Response } from "express";

/**
 * Role Check Middleware
 * @param roles - Array of roles that are allowed to access the resource
 * @returns - Middleware function
 */
const authorize = (roles: AuthRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Get user by ID
      const user = await User.findById(req.userId).select("role").exec();

      // Check if user exists
      if (!user) {
        throw new AppError(
          HTTP_STATUS.NOT_FOUND,
          ERROR_CODE.USER_NOT_FOUND,
          "User not found",
        );
      }

      // Check if user has required role
      if (!roles.includes(user.role)) {
        throw new AppError(
          HTTP_STATUS.FORBIDDEN,
          ERROR_CODE.AUTHENTICATION_ERROR,
          "You do not have permission to access this resource",
        );
      }

      next();
    },
  );
};

export default authorize;
