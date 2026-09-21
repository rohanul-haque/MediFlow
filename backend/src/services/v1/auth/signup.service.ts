/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import config from "@/config";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import transporter from "@/lib/nodemailer";
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Application Models
 */
import Doctor from "@/models/Doctor";
import User from "@/models/User";

/**
 * Types
 */
import { SignupPayload } from "@/types/payload.type";
import { AuthResponse } from "@/types/response.type";
import welcomeEmailTemplate from "@/utils/welcomeEmailTemplate";

/**
 * Service for signup user.
 * @param { SignupPayload } payload
 * @returns { Promise<AuthResponse> }
 */
const signupService = async (payload: SignupPayload): Promise<AuthResponse> => {
  // Destructure the all payload
  const { fullName, email, password, role } = payload;

  // Check if user is trying to sign as an admin with non-whitelisted email
  if (role === "admin" && !config.WHITELISTED_ADMIN_MAILS.includes(email)) {
    logger.warn(
      "You cannot sign as an admin. your email not admin whitelisted",
      { email },
    );

    throw new AppError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODE.AUTHENTICATION_ERROR,
      "You cannot signup as an admin",
    );
  }

  // Check if the user is already signed up
  const existingUser = await User.findOne({ email }).lean().exec();

  // Throw error if the user is already signed up
  if (existingUser) {
    logger.warn("User already exists this email", { email });

    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODE.USER_ALREADY_EXISTS,
      "User already exists",
    );
  }

  // Create the user
  const user = await User.create({
    fullName,
    email,
    password,
    role,
  });

  // Create doctor profile if role is doctor
  if (role === "doctor") {
    await Doctor.create({
      user: user?._id,
    });
  }

  // Send welcome email to the user
  await transporter.sendMail({
    from: config.EMAIL_USER,
    to: user?.email,
    subject: "Welcome to MediFlow",
    html: welcomeEmailTemplate(user?.fullName, user?.role),
  });

  // Generate access token & refresh token
  const accessToken = generateAccessToken(user?._id);
  const refreshToken = generateRefreshToken(user?._id);

  // Return the user, access & and refresh token
  return {
    user: {
      fullName: user?.fullName,
      email: user?.email,
      role: user?.role,
    },
    accessToken,
    refreshToken,
  };
};

export default signupService;
