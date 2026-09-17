/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Module
 */
import config from "@/config";

/**
 * Type
 */
import type { Response } from "express";

/**
 * Service for user logout
 * @param res - Response object
 * @returns {Promise<void>}
 */
const logoutService = async (res: Response): Promise<void> => {
  // Clear refresh token from cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
  });

  // Clear access token from cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
  });
};

export default logoutService;
