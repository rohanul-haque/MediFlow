/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Module
 */
import Link from "next/link";

/**
 * Components
 */
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Forgot Password Page
 */
const forgotPassword = () => {
  return (
    <div className="m-4 flex min-h-screen items-center justify-center">
      <Card className="grid w-full max-w-md">
        {/* ============= Forgot password Form ===============*/}
        <div className="p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-bold">
              <span className="text-blue-500">MediFlow</span> Forgot Your
              Password?
            </CardTitle>

            <CardDescription className="mt-1">
              No worries! Enter your email address and we'll send you a
              verification code to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pt-5">
            <ForgotPasswordForm />
          </CardContent>

          {/* ================== Back to Login Link ====================== */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-500 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default forgotPassword;
