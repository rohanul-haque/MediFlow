/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Thired-party Modules
 */
import mongoose from "mongoose";

/**
 * Application Modules
 */
import asyncHandler from "@/utils/asyncHandler";

/**
 * Application Service
 */
import getDoctorByIdService from "@/services/v1/doctor/getDoctorById.service";

/**
 * Type
 */
import { logger } from "@/lib/winston";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";
import type { Request, Response } from "express";

/**
 * Controller for get doctor by id
 */
const getDoctorByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    // get doctor id from params
    const { doctorId } = req.params;

    // call get doctor by id service
    const result = await getDoctorByIdService(
      new mongoose.Types.ObjectId(doctorId as string),
    );

    // Log the doctor get by id
    logger.info("Doctor fetched successfully", {
      doctorId,
    });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: result,
    });
  },
);

export default getDoctorByIdController;
