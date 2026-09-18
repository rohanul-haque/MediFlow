/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import config from "@/config";
import transporter from "@/lib/nodemailer";
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";
import forgotPasswordOtpEmailTemplate from "@/utils/forgotPasswordOtpEmailTemplate";

/**
 * Application Model
 */
import User from "@/models/User";

/**
 * Type
 */
import type { forgetPasswordPayload } from "@/types/payload.type";
import type { ForgotPasswordResponse } from "@/types/response.type";

/**
 * Service for user forgot password.
 * @param {forgetPasswordPayload} payload
 * @returns {Promise<ForgotPasswordResponse>}
 */
const forgetPasswordService = async (
  payload: forgetPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  // Destructure payload
  const { email } = payload;

  // Find user by email
  const user = await User.findOne({ email }).select(
    "+fullName +email +resetOtp +resetOtpExpired",
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

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set OTP and expiry time
  user.resetOtp = otp;
  user.resetOtpExpired = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Save OTP before sending email
  await user.save();

  // Send reset password OTP email
  await transporter.sendMail({
    from: config.EMAIL_USER,
    to: user.email,
    subject: "Reset Your Password - MediFlow",
    html: forgotPasswordOtpEmailTemplate(user.fullName, otp),
  });

  // Log the password reset OTP request
  logger.info("Password reset OTP sent successfully", {
    email: user.email,
  });

  return { otp };
};

export default forgetPasswordService;
