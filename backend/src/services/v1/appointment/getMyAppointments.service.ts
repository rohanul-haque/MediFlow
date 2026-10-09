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
 * Application Models
 */
import Appointment from "@/models/Appointment";

/**
 * Type
 */
import { MongoId } from "@/types/common.type";
import { AppointmentResponse } from "@/types/response.type";

/**
 * Service for getting appointments for a specific patient
 * @param { MongoId } patientId
 * @returns { Promise<AppointmentResponse[]> }
 */
const getMyAppointmentsService = async (
  patientId: MongoId,
): Promise<AppointmentResponse[]> => {
  const appointments = await Appointment.find({ patient: patientId })
    .populate({
      path: "doctor",
      populate: {
        path: "user",
        select: "fullName email role",
      },
    })
    .sort({ date: 1, startTime: 1 })
    .lean()
    .exec();

  return appointments as unknown as AppointmentResponse[];
};

export default getMyAppointmentsService;
