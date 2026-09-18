/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import asyncHandler from "@/utils/asyncHandler";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Service
 */
import forgetPasswordService from "@/services/v1/auth/forgetPassword.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for user forget password.
 */
const forgetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    // Call forget password service
    const result = await forgetPasswordService(req.body);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Reset password OTP sent successfully",
      data: {
        otp: result.otp,
      },
    });
  },
);

export default forgetPasswordController;
