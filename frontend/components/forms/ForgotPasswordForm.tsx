"use client";

/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Module
 */
import { useRouter } from "next/navigation";

/**
 * Third Party Modules
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

/**
 * API
 */
import { forgotPassword } from "@/lib/api";

/**
 * Components
 */
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

/**
 * Types
 */
import type { ErrorResponse, ValidationError } from "@/types";
import type { AxiosError } from "axios";

/**
 * Icon
 */
import { Mail } from "lucide-react";

/**
 * Login Form Schema
 */
const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

/**
 * Login Form Type
 */
export type ForgotPasswordFormValues = z.infer<typeof formSchema>;

/**
 * Forgot Password Form Component
 */
const ForgotPasswordForm = () => {
  // React Hook Form
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Router Hook
  const router = useRouter();

  // Forgot Password Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword, // Forgot Password mutation API Call

    mutationKey: ["auth", "forgot-password"], //  Mutation Key

    retry: false, // No Retry on Error

    onSuccess: (response) => {
      toast.success(response.message);

      // Redirect user to verify OTP page
      router.push(`/verify-otp?email=${form.getValues("email")}`);
    },

    onError: (error: AxiosError<ErrorResponse | ValidationError>) => {
      const errorData = error.response?.data;

      // Network or Unknown Error
      if (!errorData) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      // Validation Error
      if (errorData.code === "VALIDATION_ERROR") {
        Object.values(errorData.errors).forEach(({ msg }) => {
          toast.error(msg);
        });

        return;
      }

      // Server Error
      toast.error(errorData.message);
    },
  });

  // Submit Handler
  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        {/* ==================== Email ==================== */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon>
                  <Mail size={18} />
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* ==================== Submit ==================== */}
      <Button
        type="submit"
        className="w-full bg-blue-500 py-4.5 text-sm font-medium transition-colors hover:bg-blue-600"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Reset Password OTP"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
