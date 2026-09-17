/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import bcrypt from "bcrypt";

/**
 * Application Modules
 */
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Application Model
 */
import User from "@/models/User";

/**
 * Types
 */
import type { LoginPayload } from "@/types/payload.type";
import type { AuthResponse } from "@/types/response.type";

/**
 * Service for login user.
 * @param { LoginPayload } payload
 * @returns { Promise<AuthResponse> }
 */
const loginService = async (payload: LoginPayload): Promise<AuthResponse> => {
  // Destructure the all payload
  const { email, password } = payload;

  // Find the user by email
  const user = await User.findOne({ email })
    .select("fullName email role password")
    .lean()
    .exec();

  // Throw error if the user is not found
  if (!user) {
    logger.error("User not found", { email });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.USER_NOT_FOUND,
      "User not found!",
    );
  }

  // Compare the password
  const isPasswordMatched = await bcrypt.compare(password, user.password!);

  // Throw error if the password is not matched
  if (!isPasswordMatched) {
    logger.warn("Invalid credentials!");

    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODE.AUTHENTICATION_ERROR,
      "Invalid credentials!",
    );
  }

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

export default loginService;
