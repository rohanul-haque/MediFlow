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
import verifyForgotPasswordOtpService from "@/services/v1/auth/verifyForgotPasswordOtp.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for verify forgot password OTP
 */
const verifyForgotPasswordOtpController = asyncHandler(
  async (req: Request, res: Response) => {
    // Call service to verify forgot password OTP
    await verifyForgotPasswordOtpService(req.body);

    // Send success response
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "OTP verified successfully",
    });
  },
);

export default verifyForgotPasswordOtpController;
