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
import refreshTokenService from "@/services/v1/auth/refreshToken.service";

/**
 * Controller for refresh token.
 */
const refreshTokenController = asyncHandler(async (req, res) => {
  // Call refresh token service
  await refreshTokenService(req, res);

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: "Access token refreshed successfully",
  });
});

export default refreshTokenController;
