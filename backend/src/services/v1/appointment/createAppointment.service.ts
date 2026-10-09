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
import { CreateAppointmentPayload } from "@/types/payload.type";
import { AppointmentResponse } from "@/types/response.type";

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
 * Service for creating an appointment
 * @param { CreateAppointmentPayload } payload
 * @returns { Promise<AppointmentResponse> }
 */
const createAppointmentService = async (
  payload: CreateAppointmentPayload,
): Promise<AppointmentResponse> => {
  const { patient, doctor, date, startTime, endTime, paymentMethod } = payload;

  // 1. Validate Doctor
  const doctorData = await Doctor.findOne({ user: doctor }).lean().exec();
  if (!doctorData || doctorData.status !== "approved") {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
      "Doctor not found or not approved",
    );
  }

  // 2. Validate Date (Cannot be in the past)
  const requestDateObj = new Date(date);
  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, "0")}-${String(todayObj.getDate()).padStart(2, "0")}`;

  if (
    requestDateObj.setHours(0, 0, 0, 0) < todayObj.setHours(0, 0, 0, 0) &&
    date !== todayStr
  ) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Cannot book appointment in the past",
    );
  }

  if (date === todayStr) {
    // Current time in minutes
    let currentHours = todayObj.getHours();
    const currentMinutes = todayObj.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    const slotStartTimeInMinutes = timeToMinutes(startTime);

    if (slotStartTimeInMinutes <= currentTimeInMinutes) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
        "Cannot book past time slots",
      );
    }
  }

  // 3. Validate weekday is available
  const dayOfWeek = getDayOfWeek(date);
  const dayConfig = doctorData.availableSlots.find(
    (d: any) => d.day === dayOfWeek,
  );

  if (!dayConfig || !dayConfig.slots || dayConfig.slots.length === 0) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Doctor is not available on this day",
    );
  }

  // 4. Validate exact 30-minute slot and belongs to availability
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  if (endMinutes - startMinutes !== 30) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Appointment duration must be exactly 30 minutes",
    );
  }

  let allSlots: { startTime: string; endTime: string }[] = [];
  for (const range of dayConfig.slots) {
    const generated = generateSlots(range.from, range.to, 30);
    allSlots = [...allSlots, ...generated];
  }

  const isValidSlot = allSlots.some(
    (slot) => slot.startTime === startTime && slot.endTime === endTime,
  );
  if (!isValidSlot) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Invalid time slot",
    );
  }

  const existingAppointment = await Appointment.findOne({
    doctor,
    date,
    startTime,
    endTime,
    status: { $ne: "cancelled" },
  });

  if (existingAppointment) {
    throw new AppError(
      HTTP_STATUS.CONFLICT,
      ERROR_CODE.CONFLICT,
      "This slot is already booked",
    );
  }

  const newAppointment = await Appointment.create({
    patient,
    doctor,
    date,
    startTime,
    endTime,
    paymentMethod,
    status: "pending",
  });

  return newAppointment;
};

export default createAppointmentService;
