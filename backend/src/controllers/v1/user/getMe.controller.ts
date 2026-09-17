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
import getMeService from "@/services/v1/user/getMe.service";

/**
 * Controller for get current logged in user profile
 */
const getMeController = asyncHandler(async (req, res) => {
  // Call getMe service
  const result = await getMeService(req);

  // Log get user profile
  logger.info("User profile get successfully", {
    email: result.email,
  });

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    data: result,
  });
});

export default getMeController;
