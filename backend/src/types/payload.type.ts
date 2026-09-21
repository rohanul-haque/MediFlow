/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Types
 */
import { IDoctor } from "@/models/Doctor";
import type { IUser } from "@/models/User";
import { MongoId } from "./common.type";

/**
 * Type for signup user payload
 * @param { IUser } IUser - The interface of the user model
 */
export type SignupPayload = Pick<
  IUser,
  "fullName" | "email" | "password" | "role"
>;

/**
 * Type for login user payload
 * @param { IUser } IUser - The interface of the user model
 */
export type LoginPayload = Pick<IUser, "email" | "password">;

/**
 * Type for forget password payload
 * @param { IUser } IUser - The interface of the user model
 */
export type forgetPasswordPayload = Pick<IUser, "email">;

/**
 * Type for verify forgot password otp payload
 * @param { IUser } IUser - The interface of the user model
 */
export type VerifyForgotPasswordOtp = Pick<IUser, "email"> & {
  otp: string;
};

/**
 * Type for reset password payload
 * @param { IUser } IUser - The interface of the user model
 */
export type ResetPasswordPayload = Pick<IUser, "email"> & {
  otp: string;
  newPassword: string;
};

/**
 * Type for update doctor body
 * @param { IDoctor } IDoctor - The interface of the doctor model
 */
export type UpdateDoctorBody = Partial<
  Pick<
    IDoctor,
    | "specialization"
    | "qualification"
    | "experience"
    | "consultationFee"
    | "availableSlots"
    | "bio"
  >
> & {
  fullName?: string;
  password?: string;
};

/**
 * Type for update doctor payload
 * @param { MongoId } MongoId - The interface of the mongo id
 * @param { UpdateDoctorBody } UpdateDoctorBody - The interface of the update doctor body
 * @param { Express.Multer.File } Express.Multer.File - The interface of the express multer file
 */
export type UpdateDoctorPayload = {
  userId: MongoId;
  payload: UpdateDoctorBody;
  file?: Express.Multer.File;
};
