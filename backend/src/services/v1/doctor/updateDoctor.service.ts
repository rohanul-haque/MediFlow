/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import { uploadToCloudinary } from "@/lib/cloudinary";
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Appliation Model
 */
import Doctor from "@/models/Doctor";
import User from "@/models/User";

/**
 * Type
 */
import type { UpdateDoctorPayload } from "@/types/payload.type";

/**
 * Service for doctor update.
 * @param { string } userId
 * @param { UpdateDoctorPayload } payload
 * @param { UploadApiResponse } payload
 * @returns { Promise<void> }
 */
const updateDoctorService = async ({
  userId,
  payload,
  file,
}: UpdateDoctorPayload): Promise<void> => {
  // Destructure the all payload
  const {
    specialization,
    qualification,
    experience,
    consultationFee,
    availableSlots,
    bio,
    fullName,
    password,
  } = payload;

  // Get the user and doctor
  const [user, doctor] = await Promise.all([
    User.findById(userId),
    Doctor.findOne({ user: userId }),
  ]);

  // Check if user found
  if (!user) {
    logger.warn("User not found", { userId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.USER_NOT_FOUND,
      "User not found!",
    );
  }

  // Check if doctor found
  if (!doctor) {
    logger.warn("Doctor not found", { userId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
      "Doctor not found!",
    );
  }

  // if fullName send then update the fullName
  if (fullName) {
    user.fullName = fullName.trim();
  }

  // if password send then update the password
  if (password) {
    user.password = password;
  }

  // if file send then update the avatar
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      throw new AppError(
        HTTP_STATUS.PAYLOAD_TOO_LARGE,
        ERROR_CODE.FILE_TOO_LARGE,
        "Profile image size must be less than or equal to 5 MB",
      );
    }

    // Upload to cloudinary
    const cloudinaryData = await uploadToCloudinary(
      file.buffer,
      "Medi-Flow-API",
    );

    doctor.avatar = {
      publicId: cloudinaryData.public_id,
      url: cloudinaryData.secure_url,
      height: cloudinaryData.height,
      width: cloudinaryData.width,
    };
  }

  // if specialization send then update the specialization
  try {
    if (specialization) {
      doctor.specialization =
        typeof specialization === "string"
          ? JSON.parse(specialization)
          : specialization;
    }

    if (availableSlots) {
      doctor.availableSlots =
        typeof availableSlots === "string"
          ? JSON.parse(availableSlots)
          : availableSlots;
    }
  } catch {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Invalid JSON format for specialization or availableSlots",
    );
  }

  // if qualification send then update the qualification
  if (qualification) {
    doctor.qualification = qualification;
  }

  // if experience send then update the experience
  if (experience) {
    doctor.experience = experience;
  }

  // if consultationFee send then update the consultationFee
  if (consultationFee) {
    doctor.consultationFee = Number(consultationFee);
  }

  // if bio send then update the bio
  if (bio) {
    doctor.bio = bio;
  }

  // Save the user and doctor
  await Promise.all([user.save(), doctor.save()]);
};

export default updateDoctorService;
