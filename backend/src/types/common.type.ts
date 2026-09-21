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
 * Type Definitions
 */

/**
 * mongoose id
 */
export type MongoId = mongoose.Types.ObjectId;

/**
 * status
 */
export type Status = "approved" | "pending" | "rejected";

/**
 * Interface Definitions
 */

/**
 * image avatar
 */
export interface Avatar {
  publicId: string;
  url: string;
  height: number | null;
  width: number | null;
}

/**
 * week day
 */
export type WeekDay =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

/**
 * time slot
 */
export interface TimeSlot {
  _id?: MongoId;
  from: string;
  to: string;
}

/**
 * available slot
 */
export interface AvailableSlot {
  _id?: MongoId;
  day: WeekDay;
  slots: TimeSlot[];
}

/**
 * auth role
 */
export type AuthRole = "admin" | "doctor" | "patient";
