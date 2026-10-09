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
import getAvailableSlotsService from "@/services/v1/appointment/getAvailableSlots.service";

/**
 * Type
 */
import { logger } from "@/lib/winston";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";
import type { Request, Response } from "express";

/**
 * Controller for getting available slots
 */
const getAvailableSlotsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { doctorId } = req.params;
    const date = req.query.date as string;

    const result = await getAvailableSlotsService(
      new mongoose.Types.ObjectId(doctorId as string),
      date
    );

    logger.info("Available slots fetched successfully", { doctorId, date });

    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: result,
    });
  },
);

export default getAvailableSlotsController;
