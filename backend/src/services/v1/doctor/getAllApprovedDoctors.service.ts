/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Model
 */
import Doctor from "@/models/Doctor";

/**
 * Types
 */
import type { GetAllApprovedDoctorPayload } from "@/types/payload.type";
import type { GetAllApprovedDoctorsResponse } from "@/types/response.type";

/**
 * Service for get all approved doctor.
 * @param { GetAllApprovedDoctorPayload } GetAllApprovedDoctorPayload - The type of the get all approved doctor payload
 */
const getAllApprovedDoctorService = async ({
  limit,
  offset,
  specialization,
}: GetAllApprovedDoctorPayload): Promise<GetAllApprovedDoctorsResponse> => {
  // Filter by status and specialization
  const filter: {
    status: "approved";
    specialization?: string;
  } = {
    status: "approved",
  };

  // Add specialization filter if provided
  if (specialization) {
    filter.specialization = specialization;
  }

  // get all approved doctors and count total
  const [doctors, total] = await Promise.all([
    Doctor.find(filter)
      .select("-availableSlots")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("user", "_id fullName email role")
      .lean()
      .exec(),

    Doctor.countDocuments(filter),
  ]);

  // return all approved doctors and total number of doctors
  return {
    doctors: doctors,
    total: total,
    limit: limit,
    skip: offset,
  };
};

export default getAllApprovedDoctorService;
