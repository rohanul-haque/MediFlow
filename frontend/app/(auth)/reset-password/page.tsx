/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Components
 */
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Reset Password Page
 */
const ResetPassword = () => {
  return (
    <div className="m-4 flex min-h-screen items-center justify-center">
      <Card className="grid w-full max-w-md">
        {/* ============== Reset password Form ============== */}
        <div className="p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-bold">
              <span className="text-blue-500">MediFlow</span> Reset Your
              Password
            </CardTitle>

            <CardDescription className="mt-1">
              Create a new password for your account. Make sure your password is
              strong and secure.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pt-5">
            <ResetPasswordForm />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
