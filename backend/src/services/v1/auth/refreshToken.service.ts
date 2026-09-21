/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import config from "@/config";
import { generateAccessToken, verifyRefreshToken } from "@/lib/jwt";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Type
 */
import type { MongoId } from "@/types/common.type";
import type { Request, Response } from "express";

/**
 * Service for refresh token.
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
const refreshTokenService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Get refresh token from cookie
  const refreshToken = req.cookies.refreshToken;

  // Check if refresh token exists
  if (!refreshToken) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODE.AUTHENTICATION_ERROR,
      "Unauthorized! Refresh token not found",
    );
  }

  // Verify refresh token
  const jwtPayload = verifyRefreshToken(refreshToken) as { userId: MongoId };

  // Generate new access token
  const accessToken = generateAccessToken(jwtPayload.userId);

  // Set new access token in cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });
};

export default refreshTokenService;
