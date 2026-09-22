/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

import getDoctorByIdService from "@/services/v1/doctor/getDoctorById.service";
import asyncHandler from "@/utils/asyncHandler";
import mongoose from "mongoose";

/**
 * Application Modules
 */

/**
 * Application Service
 */

/**
 * Type
 */
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";
import type { Request, Response } from "express";

/**
 * Controller for get doctor by id
 */
const getDoctorByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { doctorId } = req.params;

    const result = await getDoctorByIdService(
      new mongoose.Types.ObjectId(doctorId as string),
    );

    // response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: result,
    });
  },
);

export default getDoctorByIdController;
