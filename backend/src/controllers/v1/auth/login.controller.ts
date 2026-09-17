/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import config from "@/config";
import { logger } from "@/lib/winston";
import asyncHandler from "@/utils/asyncHandler";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Service
 */
import loginService from "@/services/v1/auth/login.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for User Login
 */
const loginController = asyncHandler(async (req: Request, res: Response) => {
  // Call login service
  const result = await loginService(req.body);

  // Log the user login
  logger.info("User Login Successfully", {
    user: {
      fullName: result.user.fullName,
      email: result.user.email,
      role: result.user.role,
    },
  });

  // Set access token in cookie
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  // Set refresh token in cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: "User Login Successfully",
    data: {
      fullName: result.user.fullName,
      email: result.user.email,
      role: result.user.role,
    },
  });
});

export default loginController;
