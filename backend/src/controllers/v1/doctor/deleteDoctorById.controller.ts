/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Thired-party Module
 */
import mongoose from "mongoose";

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import asyncHandler from "@/utils/asyncHandler";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Service
 */
import deleteDoctorByIdService from "@/services/v1/doctor/deleteDoctorById.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for delete doctor by id
 */
const deleteDoctorByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    // Destructure the doctor id from params
    const { doctorId } = req.params;

    // Call the delete doctor by id service
    await deleteDoctorByIdService(
      new mongoose.Types.ObjectId(doctorId as string),
    );

    // Log the response
    logger.info("Doctor deleted successfully", {
      doctorId,
    });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.NO_CONTENT,
      message: "Doctor deleted successfully",
    });
  },
);

export default deleteDoctorByIdController;
