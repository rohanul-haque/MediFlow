"use client";

/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Thired Party Modules
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Send, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

/**
 *  Components
 */
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";

/**
 * Form Schema
 */
const formSchema = z.object({
  fullName: z.string().trim().min(3, "Full name must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .trim()
    .min(11, "Phone number must be at least 11 digits"),
  service: z.string().trim().min(2, "Please enter a service"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

/**
 * Form Type
 */
export type ContactFormValues = z.infer<typeof formSchema>;

/**
 * Contact Form Component
 */
const ContactForm = () => {
  // React Hook Form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      service: "",
      message: "",
    },
  });

  /**
   * Submit Handler
   */
  const onSubmit = (values: ContactFormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* ================= Name & Email ================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Full Name */}
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

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email Address</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="email"
                  placeholder="john@example.com"
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
      </div>

      {/* ================= Phone & Service ================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Phone Number</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  autoComplete="tel"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon>
                  <Phone size={18} />
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Service */}
        <Controller
          name="service"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Service</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="text"
                  placeholder="Appointment Booking"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* ================= Message ================= */}
      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Message</FieldLabel>

            <Textarea
              {...field}
              placeholder="Write your message..."
              className="min-h-32 resize-none"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* ================= Submit Button ================= */}
      <Button
        size={"lg"}
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-500 transition-colors hover:bg-blue-600"
      >
        <Send /> Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
