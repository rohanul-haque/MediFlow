/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import mongoose from "mongoose";

/**
 * Application Modules
 */
import asyncHandler from "@/utils/asyncHandler";

/**
 * Application Service
 */
import getMyAppointmentsService from "@/services/v1/appointment/getMyAppointments.service";

/**
 * Type
 */
import { logger } from "@/lib/winston";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";
import type { Request, Response } from "express";

/**
 * Controller for getting user's appointments
 */
const getMyAppointmentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const patientId = req.userId;

    const result = await getMyAppointmentsService(
      new mongoose.Types.ObjectId(patientId as unknown as string)
    );

    logger.info("My appointments fetched successfully", { patientId });

    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: result,
    });
  },
);

export default getMyAppointmentsController;
