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
import AppError from "@/utils/appError";
import { ERROR_CODE, HTTP_STATUS } from "@/utils/constants";
import { generateSlots, timeToMinutes } from "@/utils/time";

/**
 * Application Models
 */
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";

/**
 * Type
 */
import { MongoId } from "@/types/common.type";
import { GeneratedSlotResponse } from "@/types/response.type";

/**
 * Helper to get the week day name from a date string (YYYY-MM-DD)
 */
const getDayOfWeek = (dateString: string): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Invalid date format",
    );
  }
  return days[date.getDay()];
};

/**
 * Service for getting available slots for a doctor on a specific date
 * @param { MongoId } doctorId
 * @param { string } date - Format: YYYY-MM-DD
 * @returns { Promise<GeneratedSlotResponse[]> }
 */
const getAvailableSlotsService = async (
  doctorId: MongoId,
  date: string,
): Promise<GeneratedSlotResponse[]> => {
  // Check if doctor exists and is approved
  const doctor = await Doctor.findOne({ user: doctorId }).lean().exec();

  if (!doctor || doctor.status !== "approved") {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
      "Doctor not found or not approved",
    );
  }

  // Get day of week
  const dayOfWeek = getDayOfWeek(date);

  // Find the configured slots for this day
  const dayConfig = doctor.availableSlots.find((d: any) => d.day === dayOfWeek);

  if (!dayConfig || !dayConfig.slots || dayConfig.slots.length === 0) {
    return []; // No slots available for this day
  }

  // Generate all 30-minute slots based on the doctor's configuration
  let allSlots: { startTime: string; endTime: string }[] = [];
  for (const range of dayConfig.slots) {
    const generated = generateSlots(range.from, range.to, 30);
    allSlots = [...allSlots, ...generated];
  }

  // Filter out past slots if the date is today
  // Handling 'Asia/Dhaka' timezone logic simply by comparing date strings and time
  const requestDateObj = new Date(date);
  const todayObj = new Date();

  // Create string formatted dates to compare (YYYY-MM-DD) in local time
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, "0")}-${String(todayObj.getDate()).padStart(2, "0")}`;

  if (date === todayStr) {
    // Current time in minutes
    let currentHours = todayObj.getHours();
    const currentMinutes = todayObj.getMinutes();

    // Time conversion simple approach since generateSlots uses timeToMinutes
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    // Filter slots
    allSlots = allSlots.filter((slot) => {
      const slotStartTimeInMinutes = timeToMinutes(slot.startTime);
      return slotStartTimeInMinutes > currentTimeInMinutes;
    });
  } else if (
    requestDateObj.setHours(0, 0, 0, 0) < todayObj.setHours(0, 0, 0, 0)
  ) {
    // Date is in the past
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Cannot book appointment in the past",
    );
  }

  // Fetch already booked appointments for this doctor on this date
  const bookedAppointments = await Appointment.find({
    doctor: doctorId,
    date,
    status: { $ne: "cancelled" },
  })
    .lean()
    .exec();

  // Create a Set of booked slot signatures (startTime-endTime)
  const bookedSet = new Set(
    bookedAppointments.map((app) => `${app.startTime}-${app.endTime}`),
  );

  // Map generated slots to available/booked status
  const finalSlots: GeneratedSlotResponse[] = allSlots.map((slot) => {
    const signature = `${slot.startTime}-${slot.endTime}`;
    return {
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: bookedSet.has(signature) ? "booked" : "available",
    };
  });

  return finalSlots;
};

export default getAvailableSlotsService;
