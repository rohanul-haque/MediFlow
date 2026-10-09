/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

import { logger } from "@/lib/winston";
import Doctor from "@/models/Doctor";
import { MongoId } from "@/types/common.type";
import { RelatedDoctorsResponse } from "@/types/response.type";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

const relatedDoctorsService = async (
  doctorId: MongoId,
): Promise<RelatedDoctorsResponse> => {
  // Get the current doctor
  const doctor = await Doctor.findOne({ user: doctorId })
    .select("specialization")
    .lean()
    .exec();

  // Check if doctor exists
  if (!doctor) {
    logger.warn("Doctor not found!", { doctorId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
      "Doctor not found!",
    );
  }

  // Get related doctors with matching specializations
  const relatedDoctors = await Doctor.find({
    specialization: { $in: doctor.specialization },
    status: "approved",
    user: { $ne: doctorId },
  })
    .select("-availableSlots")
    .populate("user", "_id fullName email role")
    .sort({ createdAt: -1 })
    .limit(4)
    .lean()
    .exec();

  // Return related doctors
  return { doctors: relatedDoctors };
};

export default relatedDoctorsService;
