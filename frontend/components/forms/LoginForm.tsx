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
import { login } from "@/lib/api";

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
import { Lock, Mail } from "lucide-react";

/**
 * Login Form Schema
 */
const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

/**
 * Login Form Type
 */
export type LoginFormValues = z.infer<typeof formSchema>;

/**
 * LoginForm Component
 */
const LoginForm = () => {
  // React Hook Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Router Hook
  const router = useRouter();

  // Login Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: login, // Login mutation API Call

    mutationKey: ["auth", "login"], //  Mutation Key

    retry: false, // No Retry on Error

    // On Success
    onSuccess: (response) => {
      toast.success(response?.message);

      // Redirect user based on role
      switch (response.data?.role) {
        case "admin":
          router.push("/dashboard/admin");
          break;
        case "doctor":
          router.push("/dashboard/doctor");
          break;
        case "patient":
          router.push("/dashboard/patient");
          break;
        default:
          router.push("/");
      }
    },

    onError: (error: AxiosError<ValidationError | ErrorResponse>) => {
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
  const onSubmit = (values: LoginFormValues) => {
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
                  disabled={isPending}
                />

                <InputGroupAddon>
                  <Mail size={18} />
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ==================== Password ==================== */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Password</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
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
        disabled={isPending}
        className="w-full bg-blue-500 py-4.5 text-sm font-medium transition-colors hover:bg-blue-600"
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
