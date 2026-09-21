/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import jwt, { type JwtPayload } from "jsonwebtoken";

/**
 * Application Module
 */
import config from "@/config";

/**
 * Type
 */
import type { MongoId } from "@/types/common.type";

/**
 * Generate User Access Token
 * @param userId - The ID of the user
 * @returns string - The generated access token
 */
export const generateAccessToken = (userId: MongoId): string => {
  return jwt.sign({ userId }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
    subject: "accessToken",
  });
};

/**
 * Generate User Refresh Token
 * @param userId - The ID of the user
 * @returns string - The generated refresh token
 */
export const generateRefreshToken = (userId: MongoId): string => {
  return jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
    subject: "refreshToken",
  });
};

/**
 * Verify User Access Token
 * @param token - The access token to verify
 * @returns string | JwtPayload - The verified access token or payload
 */
export const verifyAccessToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
};

/**
 * Verify User Refresh Token
 * @param token - The refresh token to verify
 * @returns string | JwtPayload - The verified refresh token or payload
 */
export const verifyRefreshToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};
