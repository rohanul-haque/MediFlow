/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import { deleteFromCloudinary } from "@/lib/cloudinary";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Application Models
 */
import Doctor from "@/models/Doctor";
import User from "@/models/User";

/**
 * Type
 */
import type { MongoId } from "@/types/common.type";

/**
 * Service for delete doctor by id.
 * @param { string } doctorId
 * @returns { Promise<void> }
 */
const deleteDoctorByIdService = async (doctorId: MongoId): Promise<void> => {
  // Find user and doctor by doctorId
  const [user, doctor] = await Promise.all([
    User.findById(doctorId).lean().exec(),
    Doctor.findOne({ user: doctorId }).lean().exec(),
  ]);

  // Check if user exists
  if (!user) {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.USER_NOT_FOUND,
      "User not found!",
    );
  }

  // Check if doctor exists
  if (!doctor) {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
      "Doctor profile not found",
    );
  }

  // Delete doctor's avatar from Cloudinary if exists
  if (doctor.avatar?.publicId) {
    await deleteFromCloudinary(doctor.avatar.publicId);
  }

  // Delete user and doctor profile
  await Promise.all([
    User.deleteOne({ _id: doctorId }),
    Doctor.deleteOne({ user: doctorId }),
  ]);
};

export default deleteDoctorByIdService;
