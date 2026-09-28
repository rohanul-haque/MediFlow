/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import config from "@/config";
import { logger } from "@/lib/winston";
import asyncHandler from "@/utils/asyncHandler";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Service
 */
import getAllDoctorByAdminService from "@/services/v1/doctor/getAllDoctorByAdmin.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for Get All Doctor By Admin
 */
const getAllDoctorByAdminController = asyncHandler(
  async (req: Request, res: Response) => {
    //Get limit, offset, and specialization from request query
    const limit = Number(req.query.limit) || config.DEFAULT_LIMIT;
    const offset = Number(req.query.offset) || config.DEFAULT_OFFSET;
    const specialization = (req.query.specialization as string) || undefined;

    // Call getAllApprovedDoctorService
    const result = await getAllDoctorByAdminService({
      limit,
      offset,
      specialization,
    });

    // Log success
    logger.info("Get All Approved Doctors Successfully", { result });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: result.doctors,
      total: result.total,
      limit: result.limit,
      skip: result.skip,
    });
  },
);

export default getAllDoctorByAdminController;
