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
import updateDoctorService from "@/services/v1/doctor/updateDoctor.service";

/**
 * Types
 */
import { logger } from "@/lib/winston";
import type { Request, Response } from "express";

/**
 * Controller for Doctor Update
 */
const updateDoctorController = asyncHandler(
  async (req: Request, res: Response) => {
    // Call doctor update service
    await updateDoctorService({
      userId: req.userId!,
      payload: req.body,
      file: req.file,
    });

    // Log the doctor update
    logger.info("Doctor updated successfully", { userId: req.userId });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Doctor updated successfully",
    });
  },
);

export default updateDoctorController;
