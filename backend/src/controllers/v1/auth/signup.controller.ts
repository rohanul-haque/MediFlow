/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import asyncHandler from "@/utils/asyncHandler";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Service
 */
import signupService from "@/services/v1/auth/signup.service";

/**
 * Type
 */
import config from "@/config";
import type { Request, Response } from "express";

/**
 * Controller for User Signup
 */
const signupController = asyncHandler(async (req: Request, res: Response) => {
  // Call signup service
  const result = await signupService(req.body);

  // Log the user signup
  logger.info("User Signup Successfully", {
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
    statusCode: HTTP_STATUS.CREATED,
    message: "User Signup Successfully",
    data: {
      fullName: result.user.fullName,
      email: result.user.email,
      role: result.user.role,
    },
  });
});

export default signupController;
