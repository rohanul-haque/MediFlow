/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Module
 */

/**
 * Function For create forgot password OTP email template
 * @param {string} fullName - User's full name
 * @param {string} otp - Six digit password reset OTP
 * @returns {string}
 */
const forgotPasswordOtpEmailTemplate = (
  fullName: string,
  otp: string,
): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Password Reset OTP - MediFlow</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            font-family: "Outfit", Arial, Helvetica, sans-serif;
            color: #1f2937;
          }

          .container {
            width: 100%;
            padding: 40px 16px;
            box-sizing: border-box;
          }

          .email {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          }

          /* =========================
             Header
          ========================= */

          .header {
            background-color: #2563eb;
            padding: 28px 32px;
            text-align: center;
          }

          .logo {
            margin: 0;
            color: #ffffff;
            font-size: 30px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }

          /* =========================
             Content
          ========================= */

          .content {
            padding: 36px 32px;
          }

          .title {
            margin: 0 0 16px;
            font-size: 24px;
            line-height: 1.3;
            color: #111827;
            font-weight: 600;
          }

          .text {
            margin: 0 0 16px;
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
          }

          /* =========================
             OTP
          ========================= */

          .otp-wrapper {
            margin: 28px 0;
            padding: 24px 20px;
            background-color: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            text-align: center;
          }

          .otp-label {
            display: block;
            margin-bottom: 12px;
            color: #6b7280;
            font-size: 12px;
            line-height: 1.4;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.6px;
          }

          .otp {
            margin: 0;
            color: #2563eb;
            font-size: 32px;
            line-height: 1.3;
            font-weight: 700;
            letter-spacing: 8px;
          }

          .otp-info {
            margin: 12px 0 0;
            color: #6b7280;
            font-size: 13px;
            line-height: 1.5;
          }

          /* =========================
             Security Notice
          ========================= */

          .notice {
            margin: 24px 0;
            padding: 16px 18px;
            background-color: #eff6ff;
            border-left: 4px solid #2563eb;
            border-radius: 6px;
          }

          .notice-text {
            margin: 0;
            color: #374151;
            font-size: 14px;
            line-height: 1.6;
          }

          /* =========================
             Footer
          ========================= */

          .footer {
            padding: 20px 32px;
            background-color: #f9fafb;
            text-align: center;
          }

          .footer-text {
            margin: 0 0 6px;
            font-size: 13px;
            line-height: 1.6;
            color: #9ca3af;
          }

          .footer-text:last-child {
            margin-bottom: 0;
          }

          /* =========================
             Mobile
          ========================= */

          @media (max-width: 600px) {
            .container {
              padding: 20px 10px;
            }

            .content {
              padding: 28px 20px;
            }

            .header {
              padding: 24px 20px;
            }

            .footer {
              padding: 20px;
            }

            .title {
              font-size: 22px;
            }

            .text {
              font-size: 15px;
            }

            .otp {
              font-size: 28px;
              letter-spacing: 6px;
            }
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="email">

            <!-- Header -->
            <div class="header">
              <h1 class="logo">
                MediFlow
              </h1>
            </div>

            <!-- Content -->
            <div class="content">

              <h2 class="title">
                Password Reset Request
              </h2>

              <p class="text">
                Hello ${fullName},
              </p>

              <p class="text">
                We received a request to reset the password for your
                MediFlow account. Use the verification code below to
                continue resetting your password.
              </p>

              <!-- OTP -->
              <div class="otp-wrapper">
                <span class="otp-label">
                  Your Verification Code
                </span>

                <p class="otp">
                  ${otp}
                </p>

                <p class="otp-info">
                  This code is valid for 5 minutes.
                </p>
              </div>

              <!-- Security Notice -->
              <div class="notice">
                <p class="notice-text">
                  For your security, never share this verification code
                  with anyone. MediFlow will never ask you to share your OTP.
                </p>
              </div>

              <p class="text">
                If you didn't request a password reset, you can safely
                ignore this email. Your account will remain secure.
              </p>

              <p class="text">
                Best regards,<br />
                <strong>MediFlow Team</strong>
              </p>

            </div>

            <!-- Footer -->
            <div class="footer">
              <p class="footer-text">
                © ${new Date().getFullYear()} MediFlow. All rights reserved.
              </p>

              <p class="footer-text">
                Hospital Management &amp; Appointment Booking System
              </p>
            </div>

          </div>
        </div>
      </body>
    </html>
  `;
};

export default forgotPasswordOtpEmailTemplate;
