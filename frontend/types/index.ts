/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * User Roles
 */
export type Role = "admin" | "patient" | "doctor";

/**
 * Auth Response
 */
export interface AuthResponse {
  fullName: string;
  email: string;
  role: Role;
}

/**
 * Error Codes
 */
export type ErrorCode =
  // General
  | "INTERNAL_SERVER_ERROR"
  | "BAD_REQUEST"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "METHOD_NOT_ALLOWED"
  | "PAYLOAD_TOO_LARGE"
  | "TOO_MANY_REQUESTS"

  // Authentication
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "INVALID_CREDENTIALS"
  | "INVALID_TOKEN"
  | "TOKEN_EXPIRED"
  | "REFRESH_TOKEN_EXPIRED"
  | "ACCESS_TOKEN_EXPIRED"

  // User
  | "USER_NOT_FOUND"
  | "USER_ALREADY_EXISTS"
  | "USERNAME_ALREADY_EXISTS"
  | "EMAIL_ALREADY_EXISTS"

  // Password
  | "INVALID_PASSWORD"
  | "PASSWORD_MISMATCH"
  | "PASSWORD_RESET_REQUIRED"

  // OTP
  | "INVALID_OTP"
  | "OTP_EXPIRED"
  | "OTP_REQUIRED"

  // File Upload
  | "FILE_UPLOAD_FAILED"
  | "INVALID_FILE_TYPE"
  | "FILE_TOO_LARGE"

  // Database
  | "DATABASE_ERROR"
  | "DUPLICATE_KEY"

  // Cloudinary
  | "CLOUDINARY_UPLOAD_FAILED"

  // Email
  | "EMAIL_SEND_FAILED";

/**
 * Field Validation Error
 */
export type FieldValidationError = {
  type: "field";
  location: Location;
  path: string;
  value?: string;
  msg: string;
};

/**
 * Validation Error
 */
export type ValidationError = {
  code: "VALIDATION_ERROR";
  errors: Record<string, FieldValidationError>;
};

/**
 * API Error Response
 */
export type ErrorResponse = {
  success: false;
  code: Exclude<ErrorCode, "VALIDATION_ERROR">;
  message: string;
  stack?: string;
};

/**
 * API Response
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  error?: ValidationError | ErrorResponse;
  data?: T;
};
