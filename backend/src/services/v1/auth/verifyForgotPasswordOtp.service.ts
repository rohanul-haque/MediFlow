/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Module
 */
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Application Model
 */
import User from "@/models/User";

/**
 * Type
 */
import type { VerifyForgotPasswordOtp } from "@/types/payload.type";

/**
 * Service for verify forgot password OTP.
 * @param {VerifyForgotPasswordOtp} payload
 * @returns {Promise<void>}
 */
const verifyForgotPasswordOtpService = async (
  payload: VerifyForgotPasswordOtp,
): Promise<void> => {
  // Destructure payload
  const { email, otp } = payload;

  // Find user by email
  const user = await User.findOne({ email }).select(
    "+resetOtp +resetOtpExpired",
  );

  // Throw error if user is not found
  if (!user) {
    logger.warn("Password reset requested for non-existing user", {
      email,
    });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.USER_NOT_FOUND,
      "User not found!",
    );
  }

  // Check if OTP has expired
  if (!user.resetOtpExpired || user.resetOtpExpired.getTime() < Date.now()) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.OTP_EXPIRED,
      "OTP has expired!",
    );
  }

  // Compare OTP
  if (!user.resetOtp || user.resetOtp !== otp) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.INVALID_OTP,
      "Invalid OTP!",
    );
  }

  // Log the successful verification
  logger.info("OTP verified successfully", {
    email: user.email,
  });
};

export default verifyForgotPasswordOtpService;
