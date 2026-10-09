/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */

/**
 * Application Modules
 */
import asyncHandler from "@/utils/asyncHandler";

/**
 * Application Service
 */
import createAppointmentService from "@/services/v1/appointment/createAppointment.service";

/**
 * Type
 */
import { logger } from "@/lib/winston";
import { HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";
import type { Request, Response } from "express";

/**
 * Controller for creating an appointment
 */
const createAppointmentController = asyncHandler(
  async (req: Request, res: Response) => {
    // The patient ID comes from the authenticated user
    const patientId = req.userId;

    // Explicitly override the patient ID from body with the authenticated user ID for security
    const payload = {
      ...req.body,
      patient: patientId,
      doctor: req.body.doctor,
    };

    const result = await createAppointmentService(payload);

    logger.info("Appointment created successfully", {
      patientId,
      doctorId: req.body.doctor,
      date: req.body.date,
    });

    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.CREATED,
      data: result,
      message: "Appointment booked successfully",
    });
  },
);

export default createAppointmentController;
