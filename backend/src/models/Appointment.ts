/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { model, models, Schema, Types } from "mongoose";

/**
 * Type
 */
import type { MongoId } from "@/types/common.type";

/**
 * Appointment Interface Definition
 */
export interface IAppointment {
  patient: MongoId;
  doctor: MongoId;
  date: string;
  startTime: string;
  endTime: string;
  paymentMethod: "online" | "cash";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  prescription?: string;
}

/**
 * Appointment Schema Definition
 */
const appointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Patient ID is required"],
    },
    doctor: {
      type: Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["online", "cash"],
        message: "{VALUE} is not a supported payment method",
      },
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "completed", "cancelled"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
    prescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Appointment Model Definition
 */
const Appointment =
  models.Appointment || model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
