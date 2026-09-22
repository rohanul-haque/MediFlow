/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Type
 */
import type {
  AvailableSlot,
  Avatar,
  MongoId,
  Status,
} from "@/types/common.type";

/**
 * Type for auth response
 * @param { string } fullName - The full name of the user
 * @param { string } email - The email of the user
 * @param { string } role - The role of the user
 * @param { string } accessToken - The access token of the user
 * @param { string } refreshToken - The refresh token of the user
 */
export interface AuthResponse {
  user: {
    fullName: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * Type for user response
 * @param { string } fullName - The full name of the user
 * @param { string } email - The email of the user
 * @param { string } role - The role of the user
 */
export interface UserProfileResponse {
  _id: MongoId;
  fullName: string;
  email: string;
  role: string;
}

/**
 * Type for forgot password response
 * @param { string } otp - The OTP sent to the user
 */
export interface ForgotPasswordResponse {
  otp: string;
}

/**
 * Doctor Response Type
 * @param { MongoId } _id - The ID of the doctor profile
 * @param { UserProfileResponse } user - The user profile of the doctor
 * @param { Avatar } avatar - The avatar of the doctor
 * @param { string[] } specialization - The specialization of the doctor
 * @param { string } qualification - The qualification of the doctor
 * @param { number } experience - The experience of the doctor
 * @param { number } consultationFee - The consultation fee of the doctor
 * @param { string } bio - The bio of the doctor
 * @param { Status } status - The status of the doctor
 * @param { AvailableSlot[] } availableSlots - The available slots of the doctor
 * @param { Date } createdAt - The creation date of the doctor profile
 * @param { Date } updatedAt - The update date of the doctor profile
 */
export interface DoctorResponse {
  _id: MongoId;
  user: UserProfileResponse;
  avatar: Avatar;
  specialization: string[];
  qualification: string;
  experience: number;
  consultationFee: number;
  bio: string;
  status: Status;
  availableSlots: AvailableSlot[];
  createdAt: Date;
  updatedAt: Date;
}
