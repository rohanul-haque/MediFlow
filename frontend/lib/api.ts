import { LoginFormValues } from "@/components/forms/LoginForm";
import { SignupFormValues } from "@/components/forms/SignupForm";
import { ApiResponse, AuthResponse } from "@/types";
import mediFlowApi from "./axios";

export const signup = async (data: SignupFormValues) => {
  const response = await mediFlowApi.post<ApiResponse<AuthResponse>>(
    "/auth/signup",
    data,
  );
  return response.data;
};

export const login = async (data: LoginFormValues) => {
  const response = await mediFlowApi.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data,
  );
  return response.data;
};
