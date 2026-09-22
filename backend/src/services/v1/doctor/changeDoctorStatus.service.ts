/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Application Model
 */
import Doctor from "@/models/Doctor";

/**
 * Type
 */
import type { ChangeDoctorStatusPayload } from "@/types/payload.type";

/**
 * Service for change doctor status
 * @param { MongoId } userId - The ID of the user
 * @returns { Promise<void> }
 */
const changeDoctorStatusServicce = async ({
  doctorId,
  payload,
}: ChangeDoctorStatusPayload): Promise<void> => {
  // Destructure the status from payload
  const { status } = payload;

  // get the doctor
  const doctor = await Doctor.findOne({ user: doctorId }).exec();

  // check if doctor found
  if (!doctor) {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
      "Doctor not found!",
    );
  }

  // Check if the doctor status is already same as the payload
  if (doctor.status === status) {
    return;
  }

  // Update the doctor status
  doctor.status = status;

  // Save the doctor
  await doctor.save();
};

export default changeDoctorStatusServicce;
