/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Thired Party Modules
 */
import mongoose from "mongoose";

/**
 * Application Modules
 */
import asyncHandler from "@/utils/asyncHandler";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Services
 */
import changeDoctorStatusServicce from "@/services/v1/doctor/changeDoctorStatus.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for change doctor status
 */
const changeDoctorStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    // Get doctor ID from params
    const doctorId = req.params.doctorId;

    // Call change doctor status service
    await changeDoctorStatusServicce({
      doctorId: new mongoose.Types.ObjectId(doctorId as string),
      payload: req.body,
    });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Doctor status changed successfully!",
    });
  },
);

export default changeDoctorStatusController;
