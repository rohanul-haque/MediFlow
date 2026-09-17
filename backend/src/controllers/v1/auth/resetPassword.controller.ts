/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Module
 */
import asyncHandler from "@/utils/asyncHandler";

/**
 * Application Service
 */
import resetPasswordService from "@/services/v1/auth/resetPassword.service";

/**
 * Type
 */
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";
import type { Request, Response } from "express";

/**
 * Controller for reset password
 */
const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    // Service call
    await resetPasswordService(req.body);

    // Send response
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Password reset successfully",
    });
  },
);

export default resetPasswordController;
