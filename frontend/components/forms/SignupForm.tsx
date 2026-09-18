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
 * Thired Party Modules
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

/**
 * API
 */
import { signup } from "@/lib/api";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * Icon
 */
import { Lock, Mail, User } from "lucide-react";

/**
 * Types
 */
import type { ErrorResponse, ValidationError } from "@/types";
import type { AxiosError } from "axios";

/**
 * Signup Form Schema
 */
const formSchema = z.object({
  role: z.enum(["patient", "doctor"], {
    message: "Please select a role",
  }),

  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must not exceed 50 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(7, "Password must be at least 7 characters"),
});

/**
 * Signup Form Type
 */
export type SignupFormValues = z.infer<typeof formSchema>;

/**
 * SignupForm Component
 */
const SignupForm = () => {
  // React Hook Form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      role: "patient",
      fullName: "",
      email: "",
      password: "",
    },
  });

  // Router Hook
  const router = useRouter();

  // Signup Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: signup, // Signup mutation API Call

    mutationKey: ["auth", "signup"], //  Mutation Key

    retry: false, // No Retry on Error

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

  /**
   * Submit Handler
   */
  const onSubmit = (values: SignupFormValues) => {
    mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        {/* ========== Role =========== */}
        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Select Role</FieldLabel>{" "}
              <RadioGroup
                className="border-input grid grid-cols-2 overflow-hidden rounded-md border"
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              >
                <Label
                  htmlFor="patient"
                  className="flex h-8 cursor-pointer items-center justify-center text-center text-gray-500 has-checked:bg-blue-500 has-checked:text-white"
                >
                  <RadioGroupItem
                    id="patient"
                    value="patient"
                    className="sr-only"
                  />
                  Patient
                </Label>

                <Label
                  htmlFor="doctor"
                  className="flex h-8 cursor-pointer items-center justify-center text-center text-gray-500 has-checked:bg-blue-500 has-checked:text-white"
                >
                  <RadioGroupItem
                    id="doctor"
                    value="doctor"
                    className="sr-only"
                  />
                  Doctor
                </Label>
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ========== Full Name =========== */}
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Full Name</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon>
                  <User size={18} />
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ========== Email =========== */}
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
                  name="email"
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

        {/* ========== Password =========== */}
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
                  name="password"
                  placeholder="••••••••"
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

      {/* ================ Submit ================*/}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 py-4.5 text-sm font-medium transition-colors hover:bg-blue-600"
      >
        {isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
