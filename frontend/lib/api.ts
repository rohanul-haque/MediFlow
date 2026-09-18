/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Axios Instance
 */
import mediFlowApi from "@/lib/axios";

/**
 * Types
 */
import type { ForgotPasswordFormValues } from "@/components/forms/ForgotPasswordForm";
import type { LoginFormValues } from "@/components/forms/LoginForm";
import type { ResetPasswordFormValues } from "@/components/forms/ResetPasswordForm";
import type { SignupFormValues } from "@/components/forms/SignupForm";
import type { VerifyOtpFormValues } from "@/components/forms/VerifyOtpForm";
import type { ApiResponse, AuthResponse, ForgotPassworResponse } from "@/types";

/**
 * API Calls
 */

/**
 * Signup API Call
 * @param data - Signup form values
 * @returns Signup response
 */
export const signup = async (data: SignupFormValues) => {
  const response = await mediFlowApi.post<ApiResponse<AuthResponse>>(
    "/auth/signup",
    data,
  );
  return response.data;
};

/**
 * Login API Call
 * @param data - Login form values
 * @returns Login response
 */
export const login = async (data: LoginFormValues) => {
  const response = await mediFlowApi.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data,
  );
  return response.data;
};

/**
 * Forgot Password API Call
 * @param values - Forgot password form values
 * @returns Forgot password response
 */
export const forgotPassword = async (values: ForgotPasswordFormValues) => {
  const response = await mediFlowApi.post<ApiResponse<ForgotPassworResponse>>(
    "/auth/forget-password",
    values,
  );

  return response.data;
};

/**
 * Verify OTP API Call
 * @param values - Verify OTP form values
 * @param email - User email
 * @returns Verify OTP response
 */
export const verifyOtp = async (values: VerifyOtpFormValues, email: string) => {
  const response = await mediFlowApi.post<ApiResponse>("/auth/verify-otp", {
    email,
    otp: values.otp,
  });

  return response.data;
};

/**
 * Reset Password API Call
 * @param value - Reset password form values
 * @param email - User email
 * @param otp - OTP
 * @returns Reset password response
 */
export const resetPassword = async (
  value: ResetPasswordFormValues,
  email: string,
  otp: string,
) => {
  const response = await mediFlowApi.patch<ApiResponse>(
    "/auth/reset-password",
    {
      email,
      newPassword: value.newPassword,
      otp,
    },
  );

  return response.data;
};
