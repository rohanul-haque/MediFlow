/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Application Model
 */
import Doctor from "@/models/Doctor";

/**
 * Types
 */
import type { MongoId } from "@/types/common.type";
import type { DoctorResponse } from "@/types/response.type";

/**
 * Service for current doctor
 * @param { MongoId } userId - The ID of the user
 * @returns { Promise<DoctorResponse> }
 */
const currentDoctorService = async (
  userId: MongoId,
): Promise<DoctorResponse> => {
  // get the doctor
  const doctor = await Doctor.findOne({ user: userId })
    .populate("user", "fullName email role")
    .lean()
    .exec();

  // check if doctor found
  if (!doctor) {
    logger.warn("Doctor not found!", {
      userId,
    });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
      "Doctor not found!",
    );
  }

  // return doctor
  return doctor;
};

export default currentDoctorService;
