/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

import asyncHandler from "@/utils/asyncHandler";

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Servcie
 */
import currentDoctorService from "@/services/v1/doctor/currentDoctor.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for current doctor
 */
const currentDoctorController = asyncHandler(
  async (req: Request, res: Response) => {
    // Get user ID from request
    const userId = req.userId;

    // Call current doctor service
    const result = await currentDoctorService(userId!);

    // Log current user
    logger.info("Login doctor fetched successfully", {
      userId: result._id,
    });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: result,
    });
  },
);

export default currentDoctorController;
