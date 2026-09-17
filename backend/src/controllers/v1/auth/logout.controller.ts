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
import logoutService from "@/services/v1/auth/logout.service";

/**
 * Controller for user logout
 */
const logoutController = asyncHandler(async (_, res) => {
  // Call logout service
  await logoutService(res);

  // Log the user logout
  logger.info("User logged out successfully");

  // Send success response
  sendResponse(res, {
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: "User logged out successfully",
  });
});

export default logoutController;
