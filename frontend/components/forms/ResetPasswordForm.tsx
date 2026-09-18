"use client";

/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Module
 */
import { useRouter, useSearchParams } from "next/navigation";

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
import { resetPassword } from "@/lib/api";

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
import { Lock } from "lucide-react";

/**
 * Reset Password Form Schema
 */
const formSchema = z.object({
  newPassword: z.string().min(7, "Password must be at least 7 characters long"),
});

/**
 * Reset Password Form Type
 */
export type ResetPasswordFormValues = z.infer<typeof formSchema>;

/**
 * Reset Password Form Component
 */
const ResetPasswordForm = () => {
  //React Hook Form
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      newPassword: "",
    },
  });

  //Router Hook
  const router = useRouter();

  //Search Parameters
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); //Email
  const otp = searchParams.get("otp"); //OTP

  //Reset Password Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (values: ResetPasswordFormValues) =>
      resetPassword(values, email!, otp!), // Reset Password mutation API Call

    mutationKey: ["auth", "reset-password"], // Reset Password mutation key

    retry: false, // No retry on error
    onSuccess: (response) => {
      toast.success(response.message);

      // Redirect to login page
      router.push("/login");
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

  /**
   * Submit Handler
   */
  const onSubmit = (values: ResetPasswordFormValues) => {
    mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        {/* ==================== New Password ==================== */}
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>New Password</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="password"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon>
                  <Lock size={18} />
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
        {isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
