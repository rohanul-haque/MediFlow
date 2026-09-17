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
