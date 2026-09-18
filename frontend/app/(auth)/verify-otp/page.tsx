/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Components
 */
import VerifyOtpForm from "@/components/forms/VerifyOtpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Verify Otp Page
 */
const VerifyOtp = () => {
  return (
    <div className="m-4 flex min-h-screen items-center justify-center">
      <Card className="grid w-full max-w-md">
        {/* ============== Verify Otp Form ============== */}
        <div className="p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-bold">
              <span className="text-blue-500">MediFlow</span> Verify Your Email
            </CardTitle>

            <CardDescription className="mt-1">
              Enter the 6-digit verification code sent to your email address to
              continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pt-5">
            <VerifyOtpForm />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default VerifyOtp;
