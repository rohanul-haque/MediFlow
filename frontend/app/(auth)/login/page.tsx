/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Module
 */
import Image from "next/image";
import Link from "next/link";

/**
 * Components
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Illustration
 */
import login_illustration from "@/assets/login.svg";

/**
 * Form
 */
import LoginForm from "@/components/forms/LoginForm";

/**
 * Signup Page
 */
const SignupPage = () => {
  return (
    <div className="m-4 flex min-h-screen items-center justify-center">
      <Card className="grid w-full max-w-4xl md:grid-cols-2">
        {/* Illustration */}
        <div className="-m-4 hidden items-center justify-center bg-gray-100 md:flex dark:bg-gray-800">
          <Image
            src={login_illustration}
            alt="Login Illustration"
            className="h-auto w-full max-w-xs object-cover"
            priority
          />
        </div>

        {/* Login Form */}
        <div className="p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-bold">
              Welcome Back to <span className="text-blue-500">MediFlow</span>
            </CardTitle>

            <CardDescription className="mt-1">
              Login to access your account and manage your healthcare journey.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pt-5">
            <LoginForm />
          </CardContent>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-500">
            You don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
