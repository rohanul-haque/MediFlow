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
import { verifyOtp } from "@/lib/api";

/**
 * Components
 */
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

/**
 * Types
 */
import type { ErrorResponse, ValidationError } from "@/types";
import type { AxiosError } from "axios";

/**
 * Validation Schema
 */
const formSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

/**
 * Verify OTP Form Type
 */
export type VerifyOtpFormValues = z.infer<typeof formSchema>;

/**
 * Verify OTP Form Component
 */
const VerifyOtpForm = () => {
  // React Hook Form
  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Router Hook
  const router = useRouter();

  // Search Params Hook
  const searchParams = useSearchParams();

  // Email from Search Params
  const email = searchParams.get("email");

  // Verify OTP Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (values: VerifyOtpFormValues) => verifyOtp(values, email!), // Verify OTP mutation API Call

    mutationKey: ["verify-otp", email], // Verify OTP mutation key

    retry: false, // No retry on error

    onSuccess: (resposne) => {
      toast.success(resposne.message);

      // Redirect user to reset password page
      router.push(
        `/reset-password?email=${email}&otp=${form.getValues("otp")}`,
      );
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
  const onSubmit = (values: VerifyOtpFormValues) => {
    mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* ==================== OTP Input ==================== */}
      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot className="size-12" index={0} />
                  <InputOTPSlot className="size-12" index={1} />
                  <InputOTPSlot className="size-12" index={2} />
                  <InputOTPSlot className="size-12" index={3} />
                  <InputOTPSlot className="size-12" index={4} />
                  <InputOTPSlot className="size-12" index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* ===================== Submit ===================== */}
      <Button
        type="submit"
        className="w-full bg-blue-500 py-4.5 text-sm font-medium hover:bg-blue-600"
        disabled={isPending}
      >
        {isPending ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
};

export default VerifyOtpForm;
