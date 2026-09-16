/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Module
 */
import config from "@/config";

/**
 * Function For create welcome email template
 * @param {string} fullName - User's full name
 * @param {string} role - User's role
 * @returns {string}
 */
const welcomeEmailTemplate = (
  fullName: string,
  role: "doctor" | "patient",
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

        <title>Welcome to MediFlow</title>

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
             Account Type
          ========================= */

          .role-wrapper {
            margin: 24px 0;
            padding: 16px 18px;
            background-color: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
          }

          .role-label {
            display: block;
            margin-bottom: 8px;
            color: #6b7280;
            font-size: 12px;
            line-height: 1.4;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.6px;
          }

          .role {
            display: inline-block;
            padding: 7px 14px;
            background-color: #2563eb;
            color: #ffffff;
            border-radius: 6px;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 600;
            text-transform: capitalize;
          }

          /* =========================
             Login Button
          ========================= */

          .button-wrapper {
            margin: 28px 0;
            text-align: center;
          }

          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-size: 15px;
            line-height: 1.4;
            font-weight: 600;
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
                Welcome, ${fullName}! 👋
              </h2>

              <p class="text">
                Thank you for creating your MediFlow account.
                We're happy to have you with us.
              </p>

              <!-- Account Type -->
              <div class="role-wrapper">
                <span class="role-label">
                  Account Type
                </span>

                <span class="role">
                  ${role}
                </span>
              </div>

              <p class="text">
                Your account has been successfully created.
                You can now access MediFlow and explore the features
                available for your account.
              </p>

              <!-- Login Button -->
              <div class="button-wrapper">
                <a
                  href="${config.FRONTEND_URL}/login"
                  class="button"
                >
                  Login to MediFlow
                </a>
              </div>

              <p class="text">
                If you didn't create this account, please contact our
                support team immediately.
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

export default welcomeEmailTemplate;
