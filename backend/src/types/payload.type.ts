/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Types
 */
import type { IUser } from "@/models/User";

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
