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
 * Type
 */
import { MongoId } from "@/types/common.type";
import { DoctorResponse } from "@/types/response.type";

const getDoctorByIdService = async (
  doctorId: MongoId,
): Promise<DoctorResponse> => {
  // get the doctor
  const doctor = await Doctor.findOne({ user: doctorId })
    .populate("user", "_id fullName email role")
    .lean()
    .exec();

  // check if doctor found
  if (!doctor) {
    logger.warn("Doctor not found!", {
      doctorId,
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

export default getDoctorByIdService;
