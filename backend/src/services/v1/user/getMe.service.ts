/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Application Models
 */
import User from "@/models/User";

/**
 * Types
 */
import { UserProfileResponse } from "@/types/response.type";
import type { Request } from "express";

/**
 * Service for get current logged in user.
 * @param { Request } req
 * @returns { Promise<UserProfileResponse> }
 */
const getMeService = async (req: Request): Promise<UserProfileResponse> => {
  // get user id from request
  const userId = req.userId;

  // find user by id
  const user = await User.findById(userId)
    .select("-createdAt -updatedAt")
    .lean()
    .exec();

  // throw error if user not found
  if (!user) {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.USER_NOT_FOUND,
      "User not found!",
    );
  }

  // return user
  return user;
};

export default getMeService;
